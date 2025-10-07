import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = 'smmaksudulhaque2000@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [myEmail],
      subject: `New Message from Portfolio: ${subject}`,
      replyTo: email,
      html: `
        <div>
          <h2>Message from ${name} (${email})</h2>
          <hr />
          <h3>Subject: ${subject}</h3>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}