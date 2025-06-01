import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

export const sendSMS = (to: string, message: string) => {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE!,
    to
  });
};