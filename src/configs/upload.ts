import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

//cria uma pasta para o arquivo ficar temporário - recebido do backend
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
///cria uma pasta uploads - arquivo final manipulado
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

//middleware
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
  MULTER,
};
