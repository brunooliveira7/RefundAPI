import { Response, Request } from "express";
import z, { ZodError } from "zod";
import uploadConfig from "@/configs/upload";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/AppError";

class UploadsController {
  async create(request: Request, response: Response) {
    const diskStorage = new DiskStorage();

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

      const file = fileSchema.parse(request.file);
      const fileName = await diskStorage.saveFile(file.filename);

      response.json({ fileName });
    } catch (error) {
      if (error instanceof ZodError) {
        if (request.file) {
         await diskStorage.deleteFile(request.file.filename, "tmp");
        };

        throw new AppError(error.issues[0].message);
      }

      throw error;
    }
  }
}

export { UploadsController };
