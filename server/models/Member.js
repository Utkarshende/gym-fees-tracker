import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    phone: {
      type: String,
    },
    plan: {
      type: String,
      enum: ["monthly", "quarterly"],
      default: "monthly",
    },
    fee: {
      type: Number,
      required: true,
      min: 1,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },

    // ✅ Single correct status field
    status: {
      type: String,
      enum: ["active", "expired", "paused"],
      default: "active",
    },

    // ✅ Pause feature
    pause: {
      startDate: Date,
      endDate: Date,
    },

    // ✅ Payment history
    payments: [
      {
        amount: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ✅ Reminder tracking (for cron)
    lastReminderSent: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ✅ Auto calculate end date
memberSchema.pre("save", function () {
  const start = new Date(this.startDate);

  if (this.plan === "monthly") {
    start.setMonth(start.getMonth() + 1);
  } else if (this.plan === "quarterly") {
    start.setMonth(start.getMonth() + 3);
  }

  this.endDate = start;
});

const Member = mongoose.model("Member", memberSchema);

export default Member;