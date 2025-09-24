import { NextFunction, Request, Response } from "express";
import QuestionsModel from "../model/QuestionsModel";

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        const { category, difficulty } = req.body

        const questions = await QuestionsModel.find({ category, difficulty })

        res.json({ message: `Questions for ${category}-${difficulty} fetched successfully`, questions })
    } catch (error) {
        res.status(500).json({ message: "Error in fetching questions" })
    }
}