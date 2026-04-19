import express from "express";
import {
    getMembers,
    addMember,
    updateMember,
    deleteMember,searchMembers
} from "../controllers/memberController.js";


const router = express.Router();

router.get("/",addMember);
router.post("/",getMembers);
router.put("/:id",updateMember);
router.delete("/:id", deleteMember);
router.get("/search", searchMembers);

export default router;
