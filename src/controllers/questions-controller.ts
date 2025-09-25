import { NextFunction, Request, Response } from "express";
import QuestionsModel from "../model/QuestionsModel";

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        const { category, difficulty } = req.body

        const questions = await QuestionsModel.find({ category, difficulty })
        let TenQues = []
        let hashArr: [number] = [0]
        if (questions.length > 10) {
            let count = 0
            while (true) {
                if (count === 10) {
                    break
                }
                const randomNum = Math.floor(Math.random() * questions.length);
                if (hashArr[randomNum]) {
                    continue
                }
                count++
                hashArr[randomNum] = 1
                TenQues.push(questions[randomNum])
            }
        }

        res.json({ message: `Questions for ${category}-${difficulty} fetched successfully`, questions: TenQues.length > 0 ? TenQues : questions })
    } catch (error) {
        res.status(500).json({ message: "Error in fetching questions" })
    }
}