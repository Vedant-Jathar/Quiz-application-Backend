import express, { Request, Response, urlencoded } from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./src/routes/auth-routes"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded())

app.use("/auth", authRoutes)

// app.get("/", (req: Request, res: Response) => {
//     res.json("Hi how are you from port 4001")
// })

export default app