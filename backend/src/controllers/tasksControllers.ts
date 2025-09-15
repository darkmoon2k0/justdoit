import { Request, Response } from "express";
import Task from "../models/TaskSchema";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Failed when call getAllTasks", error);
    res.status(500).json({message: "Failed by system"});
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const title = req.body;
    const task = new Task(title);
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Failed when create new Tasks", error);
    res.status(500).json({ message: "Failed by system" });
  }
};

export const updateTask =  async (req: Request, res: Response) => {
  try {
    const {title, status, completedAt} = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      title,
      status,
      completedAt
    }, {new: true});
    if (!updatedTask) {
      return res.status(404).json({messgae: "Invalid task"})
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Failed when update Tasks", error);
    res.status(500).json({ message: "Failed by system" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ messgae: "Invalid task" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Failed when delete Tasks", error);
    res.status(500).json({ message: "Failed by system" });
  }
};
