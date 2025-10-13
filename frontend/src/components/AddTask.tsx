import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card"
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useState } from "react";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";

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
    <Card className="p-6 border-0 bg-gradient-card ">
      <div className="flex flex-col gap-3 sm:flex-row relative">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="What should be done?"
            className=" pr-[60px] shadow-sm h12 text-base bg-slate-50 border focus:border-primary/50 focus:ring-primary/30 dark:border-0 dark:bg-gradient-card  dark:shadow-[var(--shadow-sm)] dark:focus:border-primary-dark/70 dark:focus:ring-primary-dark/70"
            value={newTask}
            onChange={(e) => {
              if (e.target.value.length <= 50) setNewTask(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTask.trim() !== "") {
                addTask();
              }
            }}
          />
          <span
            className={cn(
              "absolute right-3 bottom-4.5 text-xs pointer-events-none",
              newTask.length >= 45 ? "text-red-500" : "text-muted-foreground"
            )}
          >
            {newTask.length}/50
          </span>
        </div>

        <Button variant="gradient" size="xl" className="px-6" onClick={addTask} disabled={!newTask.trim()}>
          <Plus className="size-5" />
          Add
        </Button>
      </div>
    </Card>
  );
};
