import express from "express";
import {
    getMembers,
    addMember,
    updateMember,
    deleteMember,searchMembers,
    renewMembership,markMonthlyPayment
} from "../controllers/memberController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/search", protect, searchMembers);

router.get("/", protect, getMembers);      
router.post("/", protect, addMember);     

router.put("/:id", protect, updateMember);
router.delete("/:id", protect, deleteMember);
router.put("/:id/renew", protect, renewMembership);
router.put("/:id/pay", protect, markMonthlyPayment);

export default router;
