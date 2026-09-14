import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'info@islandtoweruae.ae';
const FROM_EMAIL = 'Island Tower Website <onboarding@resend.dev>';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const validTypes = ['quote', 'contact', 'careers', 'portal'] as const;
  const formType = validTypes.includes(body.formType as typeof validTypes[number])
    ? (body.formType as typeof validTypes[number])
    : 'contact';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const discipline = typeof body.discipline === 'string' ? body.discipline.trim() : '';
  const projectReference = typeof body.projectReference === 'string' ? body.projectReference.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const subjectByType: Record<typeof validTypes[number], string> = {
    quote: `New quote request from ${name}`,
    contact: `New contact form message from ${name}`,
    careers: `New career application from ${name}`,
    portal: `New client portal access request from ${name}`,
  };
  const subject = subjectByType[formType];

  const titleByType: Record<typeof validTypes[number], string> = {
    quote: 'New Quote Request',
    contact: 'New Contact Message',
    careers: 'New Career Application',
    portal: 'New Client Portal Access Request',
  };

  const messageLabelByType: Record<typeof validTypes[number], string> = {
    quote: 'Message',
    contact: 'Message',
    careers: 'Relevant Experience',
    portal: 'Message',
  };

  const rows = [
    ['Name', name],
    ['Email', email],
    company && ['Company', company],
    phone && ['Phone', phone],
    discipline && ['Discipline / Role', discipline],
    projectReference && ['Project Reference', projectReference],
  ].filter((row): row is [string, string] => Boolean(row));

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #111;">
      <h2 style="margin: 0 0 16px;">${titleByType[formType]}</h2>
      <table cellpadding="4" cellspacing="0">
        ${rows.map(([label, value]) => `<tr><td style="font-weight:600; padding-right: 12px;">${label}</td><td>${escapeHtml(value)}</td></tr>`).join('')}
      </table>
      <p style="font-weight:600; margin-top: 20px;">${messageLabelByType[formType]}</p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Inquiry submission failed:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
