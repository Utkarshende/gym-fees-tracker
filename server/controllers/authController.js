import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 Check if ANY admin exists
    const adminExists = await Admin.findOne();
    if (adminExists) {
      return res.status(403).json({ message: "Admin already created" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (err) {
    console.error(err); // always log errors
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
