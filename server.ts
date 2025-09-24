import app from "./app";
import { configDotenv } from "dotenv";
import { connectToDb } from "./db";

configDotenv()

connectToDb()

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})