// functions/utils/emailTemplates.js

function toBase64(str) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  return btoa(unescape(encodeURIComponent(str)));
}

function bytesToBase64(bytes) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(bytes).toString('base64');
  }
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function buildConfirmationEmail({ from, to, userData }) {
  const subject = `Confirmare Înregistrare - Curs IPSC & MISIA (Zalău)`;
  const encodedSubject = `=?UTF-8?B?${toBase64(subject)}?=`;

  const accommodationText = userData.accommodation 
    ? 'Da (Solicitată la Hotel Casa Romană)' 
    : 'Nu (Aranjament propriu)';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confirmare Înregistrare Curs IPSC</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F5F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #091413;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F5F4; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 6px; overflow: hidden; border: 1px solid #CDD7D6; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background-color: #01223C; padding: 28px 36px; border-bottom: 4px solid #BA9842;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #BA9842; letter-spacing: 1.5px; text-transform: uppercase;">AIPSC & MISIA România</p>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF; line-height: 130%;">Confirmare Înregistrare Curs IPSC</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 36px;">
              <p style="font-size: 16px; line-height: 160%; color: #091413; margin: 0 0 16px 0;">
                Bună ziua, <strong>${userData.firstName} ${userData.lastName}</strong>,
              </p>
              <p style="font-size: 15px; line-height: 160%; color: #374151; margin: 0 0 24px 0;">
                Vă mulțumim pentru înregistrarea la <strong>Cursul Oficial de Siguranță & Competiție IPSC (Certificare MISIA)</strong> din Zalău, România. Cererea dumneavoastră a fost recepționată cu succes.
              </p>
              
              <div style="background-color: #F4F5F4; border-left: 4px solid #BA9842; padding: 18px 20px; border-radius: 4px; margin-bottom: 26px;">
                <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: #01223C; text-transform: uppercase; letter-spacing: 0.5px;">Sumarul înregistrării dumneavoastră:</p>
                <table width="100%" style="font-size: 14px; line-height: 170%; color: #091413;">
                  <tr>
                    <td width="42%" style="color: #5E6B6A;">Nume participant:</td>
                    <td style="font-weight: 600;">${userData.firstName} ${userData.lastName}</td>
                  </tr>
                  <tr>
                    <td style="color: #5E6B6A;">Email:</td>
                    <td style="font-weight: 600;">${userData.email}</td>
                  </tr>
                  <tr>
                    <td style="color: #5E6B6A;">Vârstă:</td>
                    <td style="font-weight: 600;">${userData.age} ani</td>
                  </tr>
                  <tr>
                    <td style="color: #5E6B6A;">Experiență tir / IPSC:</td>
                    <td style="font-weight: 600;">${userData.experience} ani</td>
                  </tr>
                  <tr>
                    <td style="color: #5E6B6A;">Opțiune echipament:</td>
                    <td style="font-weight: 600;">${userData.equipment}</td>
                  </tr>
                  <tr>
                    <td style="color: #5E6B6A;">Cazare Hotel:</td>
                    <td style="font-weight: 600;">${accommodationText}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 15px; line-height: 160%; color: #374151; margin: 0 0 16px 0;">
                <strong>Ce urmează?</strong><br>
                Un reprezentant sau instructor AIPSC vă va contacta în scurt timp pe acest email sau telefonic pentru confirmarea finală a locului, orarul detaliat și instrucțiunile organizatorice.
              </p>

              <p style="font-size: 14px; line-height: 160%; color: #5E6B6A; margin: 24px 0 0 0; border-top: 1px solid #E5E7EB; padding-top: 20px;">
                Dacă aveți întrebări suplimentare între timp, ne puteți contacta direct la <a href="mailto:contact@aipsc.ro" style="color: #01223C; font-weight: 600; text-decoration: underline;">contact@aipsc.ro</a> sau răspunzând la acest mesaj.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 20px 36px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 12px; color: #9CA3AF;">
              Asociația de Airsoft IPSC din România (AIPSC) • Partener Oficial MISIA • <a href="https://aipsc.ro" style="color: #01223C; text-decoration: none;">www.aipsc.ro</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return [
    `From: MISIA & AIPSC <${from}>`,
    `To: <${to}>`,
    `Subject: ${encodedSubject}`,
    `MIME-Version: 1.0`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <reg-${Date.now()}-${Math.random().toString(36).substring(2)}@aipsc.ro>`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    toBase64(html)
  ].join('\r\n');
}

export function buildAdminNotificationEmail({ from, to, userData, pdfBytes }) {
  const subject = `[Înregistrare Nouă Curs] ${userData.lastName} ${userData.firstName} - ${userData.equipment}`;
  const encodedSubject = `=?UTF-8?B?${toBase64(subject)}?=`;
  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const pdfFilename = `Inregistrare_${userData.lastName}_${userData.firstName}.pdf`.replace(/[^a-zA-Z0-9._-]/g, '_');

  const accommodationText = userData.accommodation 
    ? 'DA (Solicitată la Hotel Casa Romană)' 
    : 'NU (Aranjament propriu)';

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #091413; padding: 20px;">
  <h2 style="color: #01223C; margin-bottom: 8px;">Înregistrare Nouă - Curs IPSC & MISIA (Zalău)</h2>
  <p style="color: #5E6B6A; font-size: 14px; margin-top: 0;">Un nou participant a trimis formularul de înregistrare pe site-ul <strong>aipsc.ro</strong>:</p>
  
  <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 520px; font-size: 14px; border: 1px solid #CDD7D6; border-radius: 4px;">
    <tr style="background: #F4F5F4;"><td style="font-weight: bold; width: 40%; border-bottom: 1px solid #E5E7EB;">Nume complet:</td><td style="border-bottom: 1px solid #E5E7EB;">${userData.firstName} ${userData.lastName}</td></tr>
    <tr><td style="font-weight: bold; border-bottom: 1px solid #E5E7EB;">Email:</td><td style="border-bottom: 1px solid #E5E7EB;"><a href="mailto:${userData.email}">${userData.email}</a></td></tr>
    <tr style="background: #F4F5F4;"><td style="font-weight: bold; border-bottom: 1px solid #E5E7EB;">Vârstă:</td><td style="border-bottom: 1px solid #E5E7EB;">${userData.age} ani</td></tr>
    <tr><td style="font-weight: bold; border-bottom: 1px solid #E5E7EB;">Experiență IPSC:</td><td style="border-bottom: 1px solid #E5E7EB;">${userData.experience} ani</td></tr>
    <tr style="background: #F4F5F4;"><td style="font-weight: bold; border-bottom: 1px solid #E5E7EB;">Echipament:</td><td style="border-bottom: 1px solid #E5E7EB;"><strong>${userData.equipment}</strong></td></tr>
    <tr><td style="font-weight: bold; border-bottom: 1px solid #E5E7EB;">Cazare Casa Romană:</td><td style="border-bottom: 1px solid #E5E7EB;">${accommodationText}</td></tr>
    <tr style="background: #F4F5F4;"><td style="font-weight: bold;">Data recepționării:</td><td>${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}</td></tr>
  </table>

  <p style="margin-top: 24px; font-size: 13px; color: #01223C; font-weight: 600;">
    📎 Fișa oficială de înregistrare este atașată în format PDF: <code>${pdfFilename}</code>
  </p>
</body>
</html>
  `.trim();

  const base64Pdf = bytesToBase64(pdfBytes);
  const chunkedPdf = base64Pdf.match(/.{1,76}/g)?.join('\r\n') || base64Pdf;

  return [
    `From: AIPSC Registration System <${from}>`,
    `To: <${to}>`,
    `Subject: ${encodedSubject}`,
    `MIME-Version: 1.0`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <admin-${Date.now()}-${Math.random().toString(36).substring(2)}@aipsc.ro>`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    toBase64(html),
    ``,
    `--${boundary}`,
    `Content-Type: application/pdf; name="${pdfFilename}"`,
    `Content-Disposition: attachment; filename="${pdfFilename}"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    chunkedPdf,
    ``,
    `--${boundary}--`
  ].join('\r\n');
}
