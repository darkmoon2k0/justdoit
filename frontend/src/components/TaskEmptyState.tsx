import { Circle } from "lucide-react"
import { Card } from "./ui/card"
import type { FilterType } from "@/lib/type/task";

interface TaskEmptyStateProps {
  filter: FilterType;
}
export const TaskEmptyState = ({ filter }: TaskEmptyStateProps) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-muted-foreground">
            {filter === "active"
              ? "There are no tasks in progress"
              : filter === "completed"
              ? "There are no completed tasks"
              : "There are no tasks"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all" ? "Please add your first task to begin." : `Check "All Tasks" to view everything.`}
          </p>
        </div>
      </div>
    </Card>
  );
};
