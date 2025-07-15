import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/resumes");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.replace(/\s+/g, "_").replace(/[^\w.-]/g, "");
    const uniqueName = `${Date.now()}-${name}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
