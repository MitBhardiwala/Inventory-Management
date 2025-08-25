import type { Request, Response, NextFunction } from "express";
import API_MESSAGES from "./constants.ts";

export const joiGlobalErrorHandler = (err: any, res: Response) => {
  res.status(400).json({
    success: false,
    error: API_MESSAGES.VALIDATION.JOI_ERROR,
    message: err.details.map((detail: any) => ({
      message: detail.message,
      path: detail.path,
    })),
  });
};
