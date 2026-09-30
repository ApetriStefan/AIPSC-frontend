// functions/api/register.js
import { generateRegistrationPdf } from '../utils/pdfGenerator.js';
import { sendSmtpEmail } from '../utils/smtpClient.js';
import { buildConfirmationEmail, buildAdminNotificationEmail } from '../utils/emailTemplates.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, age, equipment, accommodation } = data;

    // Validate inputs
    if (!firstName || !lastName || !email || !email.includes('@') || !phone) {
      return new Response(
        JSON.stringify({ detail: 'Vă rugăm să completați toate câmpurile obligatorii (Nume, Prenume, Email valid, Telefon).' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SMTP Credentials from Cloudflare Pages environment variables
    const host = env.ZOHO_SMTP_HOST || 'smtp.zoho.eu';
    const port = Number(env.ZOHO_SMTP_PORT || 465);
    const user = env.ZOHO_SMTP_USER || 'contact@aipsc.ro';
    const pass = env.ZOHO_SMTP_PASS;

    if (!pass) {
      console.error('Missing ZOHO_SMTP_PASS in Cloudflare Pages Environment Variables');
      return new Response(
        JSON.stringify({ 
          detail: 'Configurația de email a serverului lipsește (ZOHO_SMTP_PASS). Vă rugăm contactați administratorul.' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      age: Number(age) || 18,
      equipment: equipment || 'Owned/Personal',
      accommodation: Boolean(accommodation),
      submittedAt: new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' }),
    };

    // 1. Generate formatted PDF registration form in memory
    const pdfBytes = await generateRegistrationPdf(userData);

    // 2. Build MIME email messages
    const userMime = buildConfirmationEmail({
      from: user,
      to: userData.email,
      userData,
    });

    const adminMime = buildAdminNotificationEmail({
      from: user,
      to: user, // send to contact@aipsc.ro
      userData,
      pdfBytes,
    });

    const smtpConfig = {
      host,
      port,
      user,
      pass,
      from: user,
    };

    // 3. Send email to participant
    try {
      await sendSmtpEmail({
        ...smtpConfig,
        to: userData.email,
        rawMime: userMime,
      });
    } catch (userMailErr) {
      console.error('Failed to send confirmation email to participant:', userMailErr);
      // Continue to send admin notification even if user email bounce occurred
    }

    // 4. Send email with PDF attachment to admin
    await sendSmtpEmail({
      ...smtpConfig,
      to: user,
      rawMime: adminMime,
    });

    return new Response(
      JSON.stringify({ 
        status: 'success', 
        message: 'Înregistrarea a fost trimisă cu succes! Vă rugăm să vă verificați căsuța de email.' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Registration processing error:', err);
    return new Response(
      JSON.stringify({ detail: err.message || 'A intervenit o eroare neașteptată la trimiterea înregistrării.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
