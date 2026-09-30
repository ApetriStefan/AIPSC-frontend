// functions/utils/smtpClient.js
import { connect } from 'cloudflare:sockets';

function toBase64(str) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  return btoa(unescape(encodeURIComponent(str)));
}

class SmtpConnection {
  constructor(socket) {
    this.socket = socket;
    this.reader = socket.readable.getReader();
    this.writer = socket.writable.getWriter();
    this.buffer = '';
    this.decoder = new TextDecoder();
    this.encoder = new TextEncoder();
  }

  async write(str) {
    await this.writer.write(this.encoder.encode(str));
  }

  async readResponse() {
    while (true) {
      const lines = this.buffer.split(/\r?\n/);
      if (lines.length > 1) {
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          // Standard SMTP completion: 3 digits followed by a space
          if (/^[0-9]{3} /.test(line)) {
            const consumed = lines.slice(0, i + 1).join('\n');
            this.buffer = lines.slice(i + 1).join('\n');
            const code = parseInt(line.substring(0, 3), 10);
            return { code, raw: consumed, line };
          }
        }
      }

      const { value, done } = await this.reader.read();
      if (done) {
        throw new Error('SMTP connection closed unexpectedly by remote host');
      }
      this.buffer += this.decoder.decode(value, { stream: true });
    }
  }

  async close() {
    try {
      this.reader.releaseLock();
      this.writer.releaseLock();
      await this.socket.close();
    } catch (_) {}
  }
}

export async function sendSmtpEmail({ host, port, user, pass, from, to, rawMime }) {
  const portNum = Number(port) || 465;
  const isImplicitTls = portNum === 465;

  // Port 465 uses Implicit TLS directly
  const socket = connect(
    { hostname: host, port: portNum },
    isImplicitTls ? { secureTransport: 'on' } : { secureTransport: 'starttls' }
  );

  const client = new SmtpConnection(socket);

  try {
    // 1. Initial server banner (220)
    const greeting = await client.readResponse();
    if (greeting.code !== 220) {
      throw new Error(`SMTP server connection failed: ${greeting.line}`);
    }

    // 2. EHLO handshake
    await client.write(`EHLO aipsc.ro\r\n`);
    const ehlo = await client.readResponse();
    if (ehlo.code !== 250) {
      throw new Error(`EHLO command rejected: ${ehlo.line}`);
    }

    // Explicit STARTTLS for Port 587
    if (!isImplicitTls && portNum === 587) {
      await client.write(`STARTTLS\r\n`);
      const startTlsRes = await client.readResponse();
      if (startTlsRes.code !== 220) {
        throw new Error(`STARTTLS negotiation rejected: ${startTlsRes.line}`);
      }
      socket.startTls();

      await client.write(`EHLO aipsc.ro\r\n`);
      const ehloAfterTls = await client.readResponse();
      if (ehloAfterTls.code !== 250) {
        throw new Error(`EHLO after TLS failed: ${ehloAfterTls.line}`);
      }
    }

    // 3. AUTH LOGIN
    await client.write(`AUTH LOGIN\r\n`);
    const authPromptUser = await client.readResponse();
    if (authPromptUser.code !== 334) {
      throw new Error(`AUTH LOGIN rejected: ${authPromptUser.line}`);
    }

    // Send base64 username
    await client.write(`${toBase64(user)}\r\n`);
    const authPromptPass = await client.readResponse();
    if (authPromptPass.code !== 334) {
      throw new Error(`SMTP Username rejected: ${authPromptPass.line}`);
    }

    // Send base64 password
    await client.write(`${toBase64(pass)}\r\n`);
    const authSuccess = await client.readResponse();
    if (authSuccess.code !== 235) {
      throw new Error(`SMTP Authentication failed for ${user}: ${authSuccess.line}`);
    }

    // 4. MAIL FROM
    await client.write(`MAIL FROM:<${from}>\r\n`);
    const mailFromRes = await client.readResponse();
    if (mailFromRes.code !== 250) {
      throw new Error(`MAIL FROM rejected: ${mailFromRes.line}`);
    }

    // 5. RCPT TO
    await client.write(`RCPT TO:<${to}>\r\n`);
    const rcptRes = await client.readResponse();
    if (rcptRes.code !== 250) {
      throw new Error(`RCPT TO rejected for ${to}: ${rcptRes.line}`);
    }

    // 6. DATA
    await client.write(`DATA\r\n`);
    const dataPrompt = await client.readResponse();
    if (dataPrompt.code !== 354) {
      throw new Error(`DATA rejected: ${dataPrompt.line}`);
    }

    // 7. Write MIME content terminated by CRLF.CRLF
    await client.write(`${rawMime}\r\n.\r\n`);
    const sendRes = await client.readResponse();
    if (sendRes.code !== 250) {
      throw new Error(`Message rejected by server: ${sendRes.line}`);
    }

    // 8. QUIT
    await client.write(`QUIT\r\n`);
    return { success: true, message: sendRes.line };
  } finally {
    await client.close();
  }
}
