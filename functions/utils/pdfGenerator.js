// functions/utils/pdfGenerator.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateRegistrationPdf(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions in points
  const { width, height } = page.getSize();

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // AIPSC Brand Palette
  const cNavy = rgb(1 / 255, 34 / 255, 60 / 255);       // #01223C
  const cGold = rgb(186 / 255, 152 / 255, 66 / 255);    // #BA9842
  const cDark = rgb(9 / 255, 20 / 255, 19 / 255);       // #091413
  const cMuted = rgb(94 / 255, 107 / 255, 106 / 255);   // #5E6B6A
  const cLightBg = rgb(244 / 255, 245 / 255, 244 / 255);// #F4F5F4
  const cBorder = rgb(205 / 255, 215 / 255, 214 / 255); // #CDD7D6
  const cWhite = rgb(1, 1, 1);

  // Top header banner (Dark Navy)
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: cNavy,
  });

  // Gold accent bar under header
  page.drawRectangle({
    x: 0,
    y: height - 124,
    width: width,
    height: 4,
    color: cGold,
  });

  // Header Title Text
  page.drawText('MISIA & AIPSC ROMANIA', {
    x: 48,
    y: height - 52,
    size: 13,
    font: helveticaBold,
    color: cGold,
  });

  page.drawText('COURSE REGISTRATION APPLICATION', {
    x: 48,
    y: height - 80,
    size: 20,
    font: helveticaBold,
    color: cWhite,
  });

  page.drawText('Official Participant Registration Record', {
    x: 48,
    y: height - 100,
    size: 10,
    font: helvetica,
    color: rgb(0.82, 0.88, 0.94),
  });

  // Metadata Card
  const metaY = height - 210;
  page.drawRectangle({
    x: 48,
    y: metaY,
    width: width - 96,
    height: 65,
    color: cLightBg,
    borderColor: cBorder,
    borderWidth: 1,
  });

  page.drawText('COURSE:', { x: 64, y: metaY + 44, size: 9, font: helveticaBold, color: cMuted });
  page.drawText('IPSC Safety & Competition Course (MISIA Certification)', { x: 125, y: metaY + 44, size: 10, font: helveticaBold, color: cDark });

  page.drawText('LOCATION:', { x: 64, y: metaY + 26, size: 9, font: helveticaBold, color: cMuted });
  page.drawText('Zalau, Salaj, Romania', { x: 125, y: metaY + 26, size: 9, font: helvetica, color: cDark });

  page.drawText('SUBMITTED:', { x: 64, y: metaY + 10, size: 9, font: helveticaBold, color: cMuted });
  page.drawText(data.submittedAt || new Date().toUTCString(), { x: 125, y: metaY + 10, size: 9, font: helvetica, color: cDark });

  // Section 1: Participant Information
  let currentY = metaY - 35;
  page.drawText('1. PARTICIPANT INFORMATION', {
    x: 48,
    y: currentY,
    size: 13,
    font: helveticaBold,
    color: cNavy,
  });

  currentY -= 8;
  page.drawLine({
    start: { x: 48, y: currentY },
    end: { x: width - 48, y: currentY },
    thickness: 1.5,
    color: cGold,
  });

  currentY -= 15;

  const rows1 = [
    { label: 'Full Name:', value: `${data.firstName || ''} ${data.lastName || ''}`.trim() },
    { label: 'Email Address:', value: data.email || '—' },
    { label: 'Age:', value: data.age ? `${data.age} years old` : '—' },
  ];

  for (let i = 0; i < rows1.length; i++) {
    const row = rows1[i];
    const rowY = currentY - (i * 28);
    
    if (i % 2 === 0) {
      page.drawRectangle({
        x: 48,
        y: rowY - 6,
        width: width - 96,
        height: 24,
        color: rgb(249 / 255, 250 / 255, 249 / 255),
      });
    }

    page.drawText(row.label, {
      x: 64,
      y: rowY,
      size: 10,
      font: helveticaBold,
      color: cDark,
    });

    page.drawText(String(row.value), {
      x: 230,
      y: rowY,
      size: 10,
      font: helvetica,
      color: cDark,
    });
  }

  // Section 2: Equipment & Accommodation
  currentY -= (rows1.length * 28) + 25;
  page.drawText('2. EQUIPMENT & ACCOMMODATION SELECTION', {
    x: 48,
    y: currentY,
    size: 13,
    font: helveticaBold,
    color: cNavy,
  });

  currentY -= 8;
  page.drawLine({
    start: { x: 48, y: currentY },
    end: { x: width - 48, y: currentY },
    thickness: 1.5,
    color: cGold,
  });

  currentY -= 15;

  const rows2 = [
    { 
      label: 'Equipment Preference:', 
      value: data.equipment || 'Not specified' 
    },
    { 
      label: 'Hotel Casa Romana Accommodation:', 
      value: data.accommodation === true || data.accommodation === 'yes' 
        ? 'YES - Participant requested hotel reservation' 
        : 'NO - Participant will arrange own accommodation' 
    },
  ];

  for (let i = 0; i < rows2.length; i++) {
    const row = rows2[i];
    const rowY = currentY - (i * 28);
    
    if (i % 2 === 0) {
      page.drawRectangle({
        x: 48,
        y: rowY - 6,
        width: width - 96,
        height: 24,
        color: rgb(249 / 255, 250 / 255, 249 / 255),
      });
    }

    page.drawText(row.label, {
      x: 64,
      y: rowY,
      size: 10,
      font: helveticaBold,
      color: cDark,
    });

    page.drawText(String(row.value), {
      x: 230,
      y: rowY,
      size: 10,
      font: helvetica,
      color: cDark,
    });
  }

  // Verification & Next Steps Notice Box
  currentY -= (rows2.length * 28) + 30;
  page.drawRectangle({
    x: 48,
    y: currentY - 50,
    width: width - 96,
    height: 70,
    color: rgb(253 / 255, 251 / 255, 246 / 255),
    borderColor: cGold,
    borderWidth: 1,
  });

  page.drawText('IMPORTANT NOTICE FOR INSTRUCTORS & ADMINS:', {
    x: 64,
    y: currentY + 4,
    size: 9,
    font: helveticaBold,
    color: cNavy,
  });

  page.drawText('Please verify eligibility and safety gear availability. If equipment rental is selected, reserve the', {
    x: 64,
    y: currentY - 12,
    size: 8.5,
    font: helvetica,
    color: cDark,
  });

  page.drawText('ammunition (350 rounds) and rig (Glock 17/19 Gen 5) at the shooting range for this participant.', {
    x: 64,
    y: currentY - 26,
    size: 8.5,
    font: helvetica,
    color: cDark,
  });

  // Footer
  page.drawLine({
    start: { x: 48, y: 50 },
    end: { x: width - 48, y: 50 },
    thickness: 1,
    color: cBorder,
  });

  page.drawText('Asociatia de Airsoft IPSC din Romania (AIPSC) | www.aipsc.ro | contact@aipsc.ro', {
    x: 48,
    y: 35,
    size: 8,
    font: helvetica,
    color: cMuted,
  });

  page.drawText('Official MISIA Training Partner', {
    x: width - 180,
    y: 35,
    size: 8,
    font: helveticaBold,
    color: cGold,
  });

  return await pdfDoc.save();
}
