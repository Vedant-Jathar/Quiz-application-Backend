import { Router } from "express";
import { } from "../controllers/category-controller";
import { calculateScore } from "../controllers/result-controller";

const router = Router()

router.post("/get-result", calculateScore)

export default router
