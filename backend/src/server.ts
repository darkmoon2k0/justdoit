import express from 'express';
import router from "./routes/tasksRouters";
import {connectDB} from "./db/db";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// middlewares
app.use(express.json());

app.use("/api/tasks", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server start with port: ${PORT}`);
  });
});
                                          