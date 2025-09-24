import mongoose from "mongoose";

const historyItemSchema = new mongoose.Schema({
    quizId: {
        type: Number,
        required: true
    },
    quizName: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    history: {
        type: [historyItemSchema]
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)