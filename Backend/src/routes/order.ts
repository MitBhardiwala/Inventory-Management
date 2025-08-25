import express from "express";

import { createOrder, fetchInvoice } from "../controllers/order";

const router = express.Router();

//create router
router.post("/", createOrder);

//fetch invoice
router.get("/:id",fetchInvoice)

export default router;
