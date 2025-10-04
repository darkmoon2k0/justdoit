import TaskCard from "./TaskCard";
import { TaskEmptyState } from "./TaskEmptyState";
import { type TaskListProps } from "../lib/type/task";


const TaskList = ({ filteredTasks, filter, handleTaskChanged }: TaskListProps) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard key={task._id} task={task} index={index} handleTaskChanged={handleTaskChanged} />
      ))}
    </div>
  );
};

export default TaskList
