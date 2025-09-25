import { Router } from "express";
import { getQuestions } from "../controllers/questions-controller";

const router = Router()

router.post("/get-questions", getQuestions)

export default router
