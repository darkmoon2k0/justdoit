import { Request, Response } from "express";
import Task from "../models/TaskSchema";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string | "today";
    const now = new Date();
    if (filter && filter !== "all_time") {
      let startDate: Date;
      switch (filter) {
        case "today":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case "this_week":
          const firstDayOfWeek = now.getDate() - now.getDay();
          startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
          break;
        case "this_month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case "this_year":
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(0);
      }
      const tasks = await Task.find({ createdAt: { $gte: startDate } }).sort({ createdAt: -1 });
      const activeCount = await Task.countDocuments({ status: "active", createdAt: { $gte: startDate } });
      const completedCount = await Task.countDocuments({ status: "completed", createdAt: { $gte: startDate } });
      return res.status(200).json({ tasks, activeCount, completedCount });
    }
    const result = await Task.aggregate([
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [{ $match: { status: "completed" } }, { $count: "count" }],
        }
      }
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0] ? result[0].activeCount[0].count : 0;
    const completedCount = result[0].completedCount[0] ? result[0].completedCount[0].count : 0;
    res.status(200).json({tasks, activeCount, completedCount});
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
