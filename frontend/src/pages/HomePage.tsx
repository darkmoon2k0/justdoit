import { Header } from '@/components/Header'
import { AddTask } from '@/components/AddTask'
import TaskList from '@/components/TaskList'
import { PaginationTaskList } from '@/components/PaginationTaskList'
import { DateTimeFilter } from '@/components/DateTimeFilter'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'
import { StatsAndFilter } from '@/components/StatsAndFilter'
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import axios from 'axios';
import type { Task, FilterType } from "@/lib/type/task";
import api from '@/lib/axios'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState<Task[]>([]); 
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState<FilterType>("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  const limitTasksPerPage = 3;


  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      const data = await res?.data;
      setTaskBuffer(data?.tasks || []);
      setActiveTaskCount(data?.activeCount || 0);
      setCompletedTaskCount(data?.completedCount || 0);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Fetch error:", error.response?.status, error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("Failed to fetch tasks. Please try again.");
    }
  }

  const handleTaskChanged = () => {
    fetchTasks();
  }

  const filteredTasks = taskBuffer.filter((task: Task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice((page - 1) * limitTasksPerPage, page * limitTasksPerPage);
  if (page > 1 && visibleTasks.length === 0) {
    setPage(page - 1);
  }
  const totalPages = Math.ceil(filteredTasks.length / limitTasksPerPage);
  
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  return (
    <div className="min-h-screen w-full bg-[#fefcff] dark:bg-zinc-900 relative transition-colors duration-500">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />

      {/* Royal Purple Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, 
              rgba(147, 51, 234, 0.2) 0%, 
              rgba(147, 51, 234, 0.12) 25%, 
              rgba(147, 51, 234, 0.05) 35%, 
              transparent 50%
            )
          `,
          backgroundSize: "100% 100%",
        }}
      />

      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl -6 mx-auto space-y-6">
          <Header />
          <ThemeToggle />
          <AddTask handleNewTask={handleTaskChanged} />
          <StatsAndFilter
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
            filter={filter}
            setFilter={setFilter}
          />
          <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged} />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <PaginationTaskList
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          <Footer activeTaskCount={activeTaskCount} completedTaskCount={completedTaskCount} />
        </div>
      </div>
    </div>
  );
}

export default HomePage



