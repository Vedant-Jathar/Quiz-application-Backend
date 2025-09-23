import app from "./app";
import { configDotenv } from "dotenv";

configDotenv()

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})