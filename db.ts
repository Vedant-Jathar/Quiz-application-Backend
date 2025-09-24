import mongoose from "mongoose"
import { configDotenv } from "dotenv"

configDotenv()

export const connectToDb = async () => {
    mongoose.connect(process.env.MONGO_DB_URI as string)
        .then(() => {
            console.log("Connected to database successfully");
        })
        .catch((error) => {
            console.log("Error in connecting to the database");
            console.log("Error:", error);

        })
}
