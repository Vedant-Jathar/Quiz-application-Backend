import { NextFunction, Request, Response } from "express";
import QuestionsModel from "../model/QuestionsModel";

export async function getCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await QuestionsModel.distinct("category")
        res.json({ message: "Categories fetched successfully", categories })
    } catch (error) {
        res.status(500).json({ message: "Categories fetched successfully" })
    }
}