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

        res.status(200).json({ message: "User logged in successfully", id: user._id })
    } catch (error) {
        res.status(500).json({ message: "Error in login" })
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await UserModel.findById(decoded.id).select("-password"); // exclude password

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error in fetching user" });
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies
        if (!token) {
            res.status(400).json({ message: "You are not logged in" })
        }
        res.clearCookie("token")
        res.json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error in logging out" })
    }
}