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

  async index(request: Request, response: Response) {
    const querySchema = z.object({
      //recupera o nome do usuário e faz uma busca por ele
      name: z.string().optional().default(""),
      //recupera a página atual
      page: z.coerce.number().optional().default(1),
      //recupera a quantidade de itens por página
      perPage: z.coerce.number().optional().default(10),
    });

    const { name, page, perPage } = querySchema.parse(request.query);

    //calcular os valores de skip
    const skip = (page - 1) * perPage;

    const refunds = await prisma.refund.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { user: true },
    });

    //obtém o total de registros para calcular o número de páginas
    const totalRecords = await prisma.refund.count({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    response.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    });
  }
}

export { RefundsController };
