import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card"
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useState } from "react";
import api from "@/lib/axios";

export const AddTask = ({ handleNewTask }: { handleNewTask : () => void}) => {
  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await api.post("/tasks", { title: newTask.trim() });
        toast.success("Task added successfully");
        handleNewTask();
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task. Please try again.");
      }
      setNewTask("");
    } else {
      toast.error("Task title cannot be empty.");
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="What should be done?"
          className="h12 text-base bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newTask.trim() !== "") {
              addTask();
            }
          }}
        />

        <Button variant="gradient" size="xl" className="px-6" onClick={addTask} disabled={!newTask.trim()}>
          <Plus className="size-5" />
          Add
        </Button>
      </div>
    </Card>
  );
};
