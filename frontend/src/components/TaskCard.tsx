import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Calendar, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { type Task } from '@/lib/type/task';
import api from '@/lib/axios';
import { toast } from 'sonner';


interface TaskCardProps {
  task: Task;
  index: number;
  handleTaskChanged: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const deleteTask = async (taskId: number) => {
    try {
      if (taskId) {
        await api.delete(`/tasks/${taskId}`);
        toast.success("Task deleted successfully");
        handleTaskChanged();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  const handleTitleUpdate = async () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      try {
        setIsEditing(false);
        await api.put(`/tasks/${task._id}`, { title: editedTitle.trim() });
        toast.success("Task updated successfully");
        handleTaskChanged();
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task. Please try again.");
      }
    }
    setIsEditing(false);
  };

  const toggleTaskStatus = async () => {
    try {
      if (task._id) {
        const newStatus = task.status === "active" ? "completed" : "active";
        await api.put(`/tasks/${task._id}`, { status: newStatus, completedAt: newStatus === "completed" ? new Date().toISOString() : null });
        toast.success("Task status updated successfully");
        handleTaskChanged();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  }

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card shadow-custom-md border-0 hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? " text-success hover:bg-success/20"
              : " text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskStatus}
        >
          {task.status === "completed" ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
        </Button>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                setEditedTitle(task.title);
                handleTitleUpdate();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && editedTitle.trim() !== "") {
                  handleTitleUpdate();
                }
              }}
              autoFocus
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 dark:border-border/20 dark:focus:border-primary-dark/70 dark:focus:ring-primary-dark/40 "
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200 cursor-text select-text",
                task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
              )}
              // onClick={() => setIsEditing(true)}
            >
              {task.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </span>
            {task.status === "completed" && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {task.completedAt
                    ? new Date(task.completedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })
                    : ""}
                </span>
              </>
            )}
          </div>
        </div>

        {/* {pen and trash icon} */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info dark:text-gray-400 dark:hover:text-blue-400"
            onClick={() => setIsEditing(true)}
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive dark:text-gray-400 dark:hover:text-red-400"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};


export default TaskCard