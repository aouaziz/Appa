// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT; // Get recipient from env

// Define the expected payload structure from the frontend
interface FrontendPayload {
  name: string;
  email: string; // Sender's email, used for reply-to
  subject: string; // Subject for the email
  message: string; // Combined message body
}

export async function POST(request: Request) {
  // Ensure the recipient email is configured
  if (!recipientEmail) {
    console.error("CONTACT_EMAIL_RECIPIENT environment variable is not set.");
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  let data: FrontendPayload;
  try {
    data = await request.json();
    // Basic validation of the incoming payload
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ message: "Missing required fields in request body." }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error("Failed to parse request body:", error);
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const { name, email, subject, message } = data;

    // Send email using Resend
    const { data: resendData, error } = await resend.emails.send({
      from: 'Votre Site Web <onboarding@resend.dev>', // Replace with your verified domain email if in production
      to: [recipientEmail], // Use the configured recipient email
      subject: subject,
      text: `
        Nouveau message de pré-inscription:

        Nom: ${name}
        Email: ${email}
        Sujet: ${subject}

        Détails:
        ${message}
      `,
      replyTo: email, // Set reply-to to the sender's email
    });

    if (error) {
      console.error('Error sending email via Resend:', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    console.log('Email sent successfully via Resend:', resendData);
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: unknown) {
    console.error('Unexpected error in API route:', error);
    return NextResponse.json({ message: (error instanceof Error ? error.message : 'An unexpected error occurred.') }, { status: 500 });
  }
}