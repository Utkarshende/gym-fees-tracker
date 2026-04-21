import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin); // create account
router.post("/login", loginAdmin);       // login

export default router;