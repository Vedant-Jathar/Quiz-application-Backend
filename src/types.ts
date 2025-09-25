export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string
    category: string
    difficulty: string
}

interface UserHistory {
    quizCategory: string,
    difficultyLevel: string,
    score: string,
    date: string
}

export interface User {
    _id: string
    name: string,
    email: string,
    password: string,
    history: UserHistory
}