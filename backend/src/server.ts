import express from 'express';
import router from "./routes/tasksRouters";
import {connectDB} from "./db/db";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(cors({origin: "http://localhost:3333"}));

app.use("/api/tasks", router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
}


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server start with port: ${PORT}`);
  });
});
                                          