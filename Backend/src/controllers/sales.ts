import { Request, Response } from "express";
import API_MESSAGES from "../lib/constants";
import prisma from "../lib/db";

export const fetchSalesReport = async (req: Request, res: Response) => {
  try {
    const productsReport = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
        totalPrice: true,
      },
    });

    const totalSales = await prisma.order.aggregate({
      _sum: {
        totalQuantity: true,
        totalAmount: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      data: { productsReport, totalSales },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
