import { Request, Response } from "express";

class SessionsController {
  async create(request: Request, response: Response) {
    response.json({ message: "session created" });
  }
}

export { SessionsController };
