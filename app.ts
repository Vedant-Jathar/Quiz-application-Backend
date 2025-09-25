import express, { Request, Response, urlencoded } from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./src/routes/auth-routes"
import categoryRoutes from "./src/routes/category-routes"
import cors from "cors"
import questionRoutes from "./src/routes/questions-routes"
import { calculateScore } from "./src/controllers/result-controller"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use("/auth", authRoutes)
app.use("/category", categoryRoutes)
app.use("/questions", questionRoutes)
app.use("/result", calculateScore)

// app.get("/", (req: Request, res: Response) => {
//     res.json("Hi how are you from port 4001")
// })

export default app