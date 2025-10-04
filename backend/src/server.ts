import express from 'express';
import router from "./routes/tasksRouters";
import {connectDB} from "./db/db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(express.json());
app.use(cors({origin: "http://localhost:3333"}));

app.use("/api/tasks", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server start with port: ${PORT}`);
  });
});
                                          