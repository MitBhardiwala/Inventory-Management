import { Request, Response } from "express";
import API_MESSAGES from "../lib/constants";
import { userRegistrationSchema } from "../lib/validateSchema";
import { joiGlobalErrorHandler } from "../lib/joiErrorHandler";
import prisma from "../lib/db";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { error } = userRegistrationSchema.validate({ ...req.body });
    if (error) {
      return joiGlobalErrorHandler(error, res);
    }

    //check if user exists or not
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: API_MESSAGES.USER.ALREADY_EXISTS,
      });
    }

    const newUser = await prisma.user.create({ data: req.body });

    res.status(500).json({
      success: true,
      message: API_MESSAGES.USER.CREATE_SUCCESS,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: API_MESSAGES.USER.CREATE_ERROR,
    });
  }
};

