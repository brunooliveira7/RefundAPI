import { Request, Response } from "express";
import { z } from "zod";

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

    response.status(200).json({ name, amount, category, filename });
  }
}

export { RefundsController };
