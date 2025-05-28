import { Response, Request } from "express";

class UploadsController {
  async create(request: Request, response: Response) {
    response.json({ message: "upload" });
  }
}

export { UploadsController };
