import { NextFunction, Request, Response } from "express";
import UserModel from "../model/UserModel";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        
        const { name, email, password } = req.body

        // Check if any user with the given email exists in the db:
        const user = await UserModel.findOne({ email })

        if (user) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        // Create the user in the db after hashing the password:

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = await UserModel.create({ name, email, password: hashedPassword })

        // Set token in the cookies:
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "24h" })

        res.cookie("token", token)

        res.status(201).json({ message: "User created successfully", id: newUser._id })
    } catch (error) {
        res.status(500).json({ message: "Error in registering user" })
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body

        // Check if any user with the given email exists in the db:
        const user = await UserModel.findOne({ email })

        if (!user) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }

        //Check if teh password is correct:

        const isPasswordMatched = await bcryptjs.compare(password, user.password)

        if (!isPasswordMatched) {
            res.status(400).json({ message: "Invalid credentials" })
            return
        }

        // Set token in the cookies:
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "24h" })

        res.cookie("token", token)

        res.status(201).json({ message: "User logged in successfully", id: user._id })
    } catch (error) {
        res.status(500).json({ message: "Error in login" })
    }
}