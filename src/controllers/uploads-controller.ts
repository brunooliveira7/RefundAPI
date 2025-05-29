import { Response, Request } from "express";
import { z } from "zod";
import uploadConfig from "@/configs/upload";
import { AppError } from "@/utils/AppError";

class UploadsController {
  async create(request: Request, response: Response) {
    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, "filename is required"),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_FILE_TYPES.includes(type),
              `Format file not accepted. Formats accepted: ${uploadConfig.ACCEPTED_FILE_TYPES}`
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= uploadConfig.MAX_FILE_SIZE,
              `File size is too large. Max size: ${uploadConfig.MAX_SIZE}`
            ),
        })
        .passthrough();

        const {file} = fileSchema.parse(request.file);

      response.json({message: "File sent successfully"});
    } catch (error) {
      throw new AppError("Erro ao fazer upload de arquivo");
    }
  }
}

export { UploadsController };
