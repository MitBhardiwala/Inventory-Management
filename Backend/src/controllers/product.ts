import { Request, Response } from "express";
import API_MESSAGES from "../lib/constants";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../lib/validateSchema";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler";
import prisma from "../lib/db";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productCreateSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    //check if user exists or not
    const existingProduct = await prisma.product.findUnique({
      where: { name: req.body.name },
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        error: API_MESSAGES.PRODUCT.ALREADY_EXISTS,
      });
    }

    const newProduct = await prisma.product.create({ data: req.body });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.PRODUCT.CREATE_SUCCESS,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.PRODUCT.CREATE_ERROR,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteResult = await prisma.product.deleteMany({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      success: true,
      message:
        deleteResult.count > 0
          ? API_MESSAGES.DATA.DELETE_SUCCESS
          : API_MESSAGES.DATA.NOT_FOUND,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.DELETE_ERROR,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = productUpdateSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    //check if product exists or not
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return res.status(409).json({
        success: false,
        error: API_MESSAGES.DATA.NOT_FOUND,
      });
    }

    const updatedResult = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    return res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.UPDATE_SUCCESS,
      data: updatedResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.UPDATE_ERROR,
    });
  }
};

export const viewProducts = async (req: Request, res: Response) => {
  try {

    const products = await prisma.product.findMany();

    return res.status(200).json({
      success: true,
      message: products.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};

export const fetchProductById = async (req: Request, res: Response) => {
  try {
   
    const { id } = req.params;
    const product = await prisma.product.findMany({
      where: {
        id: Number(id),
      },
    });

    console.log(product);
    return res.status(200).json({
      success: true,
      message: product.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
