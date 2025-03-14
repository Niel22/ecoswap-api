const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../../public", folder);

      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file"), false);
  }
};

const upload = (folder) =>
  multer({
    storage: storage(folder),
    limits: {
      fileSize: 1024 * 1024,
    },
    fileFilter: fileFilter,
  });

module.exports = upload;
