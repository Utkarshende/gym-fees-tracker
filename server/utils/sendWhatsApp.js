import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsAppMessage = async (to, message) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+91${to}`, // India format
      body: message,
    });

    console.log("✅ WhatsApp sent to", to);
  } catch (error) {
    console.error("❌ WhatsApp Error:", error.message);
  }
};