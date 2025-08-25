import express from "express";
import user from "./user";
import product from "./product";
import order from "./order";

const router = express.Router();

//user routes
router.use("/user", user);

//product routes
router.use("/product", product);

//order routes
router.use("/order", order);

export default router;
