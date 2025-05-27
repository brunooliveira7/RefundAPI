import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

const categoriesEnum = z.enum([
  "food",
  "other",
  "services",
  "transport",
  "accomodation",
]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: "Name is required" }),
      amount: z
        .number()
        .positive({ message: "Amount is required and must be positive" }),
      category: categoriesEnum,
      filename: z.string().min(20),
    });

    const { name, amount, category, filename } = bodySchema.parse(request.body);

    if (!request.user?.id) {
      throw new AppError("Unauthorized", 401);
    }

    const refund = await prisma.refund.create({
      data: { name, amount, category, filename, userId: request.user.id },
    });

    response.status(201).json({ refund });
  }
}

export { RefundsController };
