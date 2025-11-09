import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./config/db.js";
import authRouter from "./api/v1/routes/auth.routes.js"
import { errorHandler } from "./utils/errorHandler.js"
import productRouter from "./api/v1/routes/product.routes.js"
import adminRouter from "./api/v1/routes/admin.routes.js"
dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors())
app.use(morgan('dev'));
app.use(express.json())

app.get("/",(req,res)=>{
    return res.status(200).json({msg:"Hello , Everything is Good"})
})
app.use(errorHandler)

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/products",productRouter)
app.use('/api/v1/admin',adminRouter)
export default app;