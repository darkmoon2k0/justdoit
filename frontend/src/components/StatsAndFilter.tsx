import { Badge } from "./ui/badge"
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import type { FilterType } from "@/lib/type/task";
import {FilterLabel} from "@/lib/type/task";

interface StatsAndFilterProps {
  activeTasksCount?: number;
  completedTasksCount?: number;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

export const StatsAndFilter: React.FC<StatsAndFilterProps> = ({
  activeTasksCount = 0,
  completedTasksCount = 0,
  filter,
  setFilter,
}) => {
  return (
    <div className="flex flex-col item-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge variant="secondary" className="bg-white/50 text-accent-foreground border-info/20">
          {activeTasksCount} {FilterLabel.active}
        </Badge>

        <Badge variant="secondary" className="bg-white/50 text-success border-success/20">
          {completedTasksCount} {FilterLabel.completed}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {(Object.entries(FilterLabel) as [FilterType, string][]).map(([type, label]) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
            onClick={() => setFilter(type)}
          >
            <Filter className="size-4" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};
