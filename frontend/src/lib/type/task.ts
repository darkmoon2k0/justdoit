export const FilterLabel = {
  all: "All tasks",
  active: "In progress",
  completed: "Completed",
};

export interface Task {
  _id: number;
  title: string;
  status: "active" | "completed";
  createdAt: string;
  completedAt?: string | null;
}
export interface FilteredTasksProps {
  filteredTasks: Task[];
}

export type FilterType = keyof typeof FilterLabel;

export interface TaskListProps {
  filteredTasks: Task[];
  filter: FilterType;
  handleTaskChanged: () => void;
  // setFilter: (f: FilterType) => void;
}
export const DateOptions = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "this_week",
    label: "This Week",
  },
  {
    value: "this_month",
    label: "This Month",
  },
  {
    value: "this_year",
    label: "This Year",
  },
  {
    value: "all_time",
    label: "All",
  },
];

