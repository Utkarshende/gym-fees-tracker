import Member from "../models/Member.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMember = async()=> {
    try{
const member = await Member.findByIdAndUpdate(req.params.id);
if(!member){
    return res.status(404).json({message:"Member not found"});
}

member.startDate = new Date();
member.status = "active";

await member.save();
res.json(member);
    }
    catch(error){
res.status(500).json({message:error.message});
    }
};

//delete

export const deleteMember = async (req, res)=> {
    try{
await Member.findByIdAndDelete(req.params.id);
res.json({message:"Member deleted"});
    }
    catch(error){
res.status(500).json({message:error.message});
    }
};

export const searchMembers = async (req, res) => {
  try {
    const { keyword, status } = req.query;

    let query = {};

    // 🔍 Search by name or phone
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { phone: { $regex: keyword, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const members = await Member.find(query).sort({ createdAt: -1 });

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 DEBUG

    const member = await Member.create(req.body);

    res.status(201).json(member);
  } catch (error) {
    console.error("ADD MEMBER ERROR:", error); // 👈 VERY IMPORTANT
    res.status(500).json({ message: error.message });
  }
};
export const renewMembership = async (req, res) => {
  try {
    const { amount } = req.body;

    const member = await Member.findById(req.params.id);

    // extend by 30 days
    member.endDate = new Date(
      new Date(member.endDate).getTime() + 30 * 24 * 60 * 60 * 1000
    );

    // add payment record
    member.payments.push({ amount });

    await member.save();

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markMonthlyPayment = async (req, res) => {
  try {
    const { month, amount } = req.body;

    const member = await Member.findById(req.params.id);

    const date = new Date();
    date.setMonth(month);

    member.payments.push({
      amount,
      date,
    });

    await member.save();

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const pauseMembership = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const member = await Member.findById(req.params.id);

    member.status = "paused";
    member.pause = {
      startDate,
      endDate,
    };

    await member.save();

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resumeMembership = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    member.status = "active";
    member.pause = {};

    await member.save();

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};