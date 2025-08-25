import { Request, Response } from "express";
import API_MESSAGES from "../lib/constants";
import prisma from "../lib/db";
import {
  checkIfStocksAvailable,
  getOrderItems,
  populateOrderItemTable,
} from "../lib/utils";
import { createOrderSchema, productCreateSchema } from "../lib/validateSchema";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler";

export const createOrder = async (req: Request, res: Response) => {
  try {

    const { error } = createOrderSchema.validate(req.body);
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    const { customerId, items } = req.body;
    //check if user is eligible to purachse ( by checking stocks)
    const isStockAvailable = await checkIfStocksAvailable(items);
    if (!isStockAvailable) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.ORDER.NO_STOCK_AVAILABLE,
      });
    }

    const { orderItems, totalAmount, totalQuantity } = await getOrderItems(
      items
    );
    //create order
    const newOrder = await prisma.order.create({
      data: {
        customerId: customerId,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
      },
    });

    //populate order item table
    const orderId = newOrder.id;
    const populateOrderItems = await populateOrderItemTable(
      orderId,
      orderItems
    );

    if (!populateOrderItems) {
      return res.status(400).json({
        success: false,
        error: API_MESSAGES.ORDER.CREATE_ERROR,
      });
    }

    res.status(201).json({
      success: true,
      message: API_MESSAGES.ORDER.CREATE_SUCCESS,
      data:newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.ORDER.CREATE_ERROR,
    });
  }
};

export const fetchInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Customer: true,
        OrderItem: {
          include: {
            Product: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
};
