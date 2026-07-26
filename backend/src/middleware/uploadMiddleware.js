const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "backend/uploads/resumes");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("only PDF files are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5*1024*1024
    },
    fileFilter
});

module.exports = upload;