import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";

class SessionsController {
  async create(request: Request, response: Response) {
    const schema = z.object({
      email: z.string().email({ message: "Invalid email" }),
      password: z.string(),
    });

    const { email, password } = schema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 401);
    }

    response.json({ email, password });
  }
}

export { SessionsController };
