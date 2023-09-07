import express, { application } from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
/* this metods are imported seperated bacause they use files TODO search more */
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js"

/* CONFIGURATIONs */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();//load the enviroment variables from .env
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {//defines the destination
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {//and the file name
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage})//upload is a instace of multer middleware

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/createPosts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URLocal, {})
    .then(() => {
        app.listen(PORT, () => console.log(`server PORT: ${PORT}`))
    })
    .catch((error) => console.log(`Did Not Conect Error: ${error}`))
