import { NextFunction, Request, Response } from "express";
import { Question, User } from "../types";
import UserModel from "../model/UserModel";

export async function calculateScore(req: Request, res: Response, next: NextFunction) {
    try {
        const { category, difficulty, questions, userAnswers, user } = req.body
        let score = 0
        let reviewedAns = []
        const { to_be_saved } = req.query
        const total = questions.length

        for (let i in userAnswers) {
            console.log("i: ", i, "userAns: ", userAnswers[i]);
            for (let q of questions as Question[]) {
                if (Number(i) === q.id) {
                    console.log("HI i and q.id", i, "q.id", q.id);
                    if (q.answer === userAnswers[i]) {
                        score++
                        reviewedAns.push({
                            id: Number(i),
                            question: q.question,
                            selectedAns: userAnswers[i],
                            answer: q.answer
                        })
                    } else {
                        reviewedAns.push({
                            id: Number(i),
                            question: q.question,
                            selectedAns: userAnswers[i],
                            answer: q.answer
                        })
                    }
                }
            }
        }

        if (to_be_saved === "true") {
            await UserModel.updateOne(
                { _id: (user as User)._id }, // filter
                {
                    $push: {
                        history: {
                            quizCategory: category,
                            difficultyLevel: difficulty,
                            score,
                            total,
                            date: new Date()
                        }
                    }
                }
            );
        }

        res.json({
            message: "Result calculated successfully",
            score,
            total: questions.length,
            reviewedAns
        })

    } catch (error) {
        res.status(500).json({ message: "Error in calculating result" })
    }
}