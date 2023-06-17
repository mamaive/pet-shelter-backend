import cors from "cors";
import "reflect-metadata";
import 'dotenv/config';
import express, {Application, Request} from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import multer from "multer";
import {v4 as uuidv4} from 'uuid';
import swaggerDocument from "./config/swagger.json";

import AppDataSource from "./config/database";
import Router from "./routes";

const PORT = process.env.PORT || 8000;

const app: Application = express();

const multerStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, `${__dirname}/../../pet-shelter-backend/public/uploads`);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const ext = file.mimetype.split('/')[1];
        const filename = `${uuidv4()}-${Date.now()}.${ext}`;
        req.body.image = filename;
        req.body.images = [];
        cb(null, filename);
    },
});

const multerFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (!file.mimetype.startsWith('image')) {
        return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
    }
    cb(null, true);
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {fileSize: 1024 * 1024 * 5, files: 1},
});

app.use(cors())
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.post("/upload-cat", upload.single("image"), (req, res) => {
    res.send({filename: req.file?.filename})
})

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(Router);

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to db", err);
        process.exit(1);
    });


export default app;