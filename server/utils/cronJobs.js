import cron from "node-cron";
import Member from "../models/Member.js";
import { sendWhatsAppMessage } from "./sendWhatsApp.js";

export const startCronJobs = () => {
  cron.schedule("0 9 * * *", async () => {
    console.log("Running daily expiry check...");

    const today = new Date();

    try {
      // ✅ 1. Mark expired members
      const expiredMembers = await Member.updateMany(
        {
          endDate: { $lt: today },
          status: "active",
        },
        {
          $set: { status: "expired" },
        }
      );

      console.log(`Expired updated: ${expiredMembers.modifiedCount}`);

      // ✅ 2. Find members expiring in 2 days
      const twoDaysLater = new Date();
      twoDaysLater.setDate(today.getDate() + 2);

      const expiringSoon = await Member.find({
        status: "active", // ✅ ignore paused/expired
        endDate: {
          $gte: today,
          $lte: twoDaysLater,
        },
      });

      console.log(`Members expiring soon: ${expiringSoon.length}`);

      // ✅ 3. Send WhatsApp reminders
      for (let member of expiringSoon) {
        const message = `Hi ${member.name}, your gym membership expires on ${new Date(
          member.endDate
        ).toDateString()}. Please renew soon.`;

        console.log(`Sending reminder to ${member.phone}`);

        await sendWhatsAppMessage(member.phone, message);
      }
    } catch (error) {
      console.log("Cron job error:", error.message);
    }
  });
};