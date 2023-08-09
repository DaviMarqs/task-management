import React, { createContext, useContext, useState } from "react";
import { Task } from "../@types/task";

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// Crie o contexto
const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC = ({ children }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const value: TaskContextType = { tasks, setTasks };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
