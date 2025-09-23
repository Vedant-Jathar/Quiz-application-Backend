import express, { Request, Response } from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.json("Hi how are you from port 4001")
})

export default app