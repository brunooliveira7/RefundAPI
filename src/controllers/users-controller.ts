import { Request, Response } from "express";
import { z } from "zod";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";

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

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userWithSameEmail) {
      throw new AppError("email already exists");
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    response.status(201).json({ message: "user created" });
  }
}

export { UsersController };
