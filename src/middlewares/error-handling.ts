import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandling: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      message: "validation error",
      issues: error.format(),
    });
    return;
  }

  //se não for um erro conhecido, retorna um erro 500
  response.status(500).json({
    message: error.message,
  });
  return;
};
