import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  viewProducts,
  fetchProductById,
} from "../controllers/product";

const router = express.Router();

//create router
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.get("/:id", fetchProductById);
router.get("", viewProducts);


export default router;
