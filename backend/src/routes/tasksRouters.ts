import express from "express";
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/tasksControllers";
export const taskRoute = express.Router();

taskRoute.get("/", getAllTasks);

taskRoute.post("/", createTask);

taskRoute.put("/:id", updateTask);

taskRoute.delete("/:id", deleteTask);

export default taskRoute;