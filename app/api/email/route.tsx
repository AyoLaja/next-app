import WelcomeEmail from '@/emails/Welcome';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the body
  const validatedBody = emailSchema.safeParse(body);

  // If the body is not valid, return a 400 error
  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  // Send the email
  const emailTemplate = await resend.emails.send({
    from: 'ayo.onalaja@gmail.com',
    to: body.email,
    subject: "Welcome to Ayo's next app",
    // react: WelcomeEmail({ email: body.email }),
    react: <WelcomeEmail email={body.email} />,
  });

  // If the email is not sent, return a 500 error
  if (!emailTemplate) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }

  // If the email is sent, return the email template
  return NextResponse.json({ emailTemplate }, { status: 200 });
}
