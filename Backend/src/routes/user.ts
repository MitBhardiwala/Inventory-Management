import express from "express";
import { createUser } from "../controllers/user";

const router = express.Router();

//create router
router.post("/", createUser);

export default router;
