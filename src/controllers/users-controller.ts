import { Request, Response } from "express";
import { z } from "zod";
import { UserRole } from "@prisma/client";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "name must be at least 2 characters" }),
      email: z
        .string()
        .trim()
        .email({ message: "invalid email" })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: "password must be at least 6 characters" }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    const { name, email, password, role } = bodySchema.parse(request.body);

    response.json({ name, email, password, role });
  }
}

export { UsersController };
