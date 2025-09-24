import { NextFunction, Request, Response } from "express";
import z from "zod"

export const validate =
    (schema: z.ZodSchema<any>, source: "body" | "query" | "params" = "body") =>
        (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req[source]);
            if (!result.success) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: result.error,
                });
            }
            next();
        };