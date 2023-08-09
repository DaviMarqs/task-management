import { useState } from "react";
import { Subtask } from "../@types/subtask";
import { useTaskContext } from "../contexts/TaskContext";
import { api } from "../lib/axios";

export default function useTask() {
  const [isLoading, setIsLoading] = useState(false);
  const { setTasks } = useTaskContext();

  async function getTasks(query?: string) {
    try {
      setIsLoading(true);
      const res = await api.get(`todo?filter=${query}`);
      setTasks(res.data);
      return res.data;
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateNewTask(event: React.FormEvent, label: string) {
    event.preventDefault();
    try {
      await api.post("todo", {
        label: label,
      });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function markTaskAsDone(id: string) {
    try {
      setIsLoading(true);
      await api.patch(`todo/${id}/done`);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function markTaskAsUndone(id: string) {
    try {
      setIsLoading(true);
      await api.patch(`todo/${id}/undone`);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function createSubtask({ label, todoId }: Subtask) {
    try {
      setIsLoading(true);
      await api.post(`todo/${todoId}/subtasks`, { label });
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    getTasks,
    setIsLoading,
    isLoading,
    markTaskAsDone,
    markTaskAsUndone,
    createSubtask,
    handleCreateNewTask,
  };
}
