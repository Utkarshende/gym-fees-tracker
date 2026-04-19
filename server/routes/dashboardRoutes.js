import express from "express";
import { getDashboardStats, getExpiringMembers } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/stats", getDashboardStats);
router.get("/expiring", getExpiringMembers);


export default router;