import express from "express";
import { fetchSalesReport } from "../controllers/sales";

const router = express.Router();

//create router
router.get("/", fetchSalesReport);

export default router;
