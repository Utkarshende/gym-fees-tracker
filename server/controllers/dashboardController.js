import Member from "../models/Member.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();

    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);

    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      status: "active",
    });

    const expiredMembers = await Member.countDocuments({
      status: "expired",
    });

    const expiringSoon = await Member.countDocuments({
      endDate: {
        $gte: today,
        $lte: twoDaysLater,
      },
      status: "active",
    });

    res.json({
      totalMembers,
      activeMembers,
      expiredMembers,
      expiringSoon,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getExpiringMembers = async (req, res) => {
  try {
    const today = new Date();

    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);

    const members = await Member.find({
      endDate: {
        $gte: today,
        $lte: twoDaysLater,
      },
      status: "active",
    });

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};