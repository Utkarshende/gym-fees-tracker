import express from "express";
import { sendWhatsAppMessage } from "../utils/sendWhatsApp.js";

const router = express.Router();

router.get("/whatsapp", async (req, res) => {
  await sendWhatsAppMessage("YOUR_NUMBER", "Test message 🚀");
  res.send("Message sent");
});

export default router;