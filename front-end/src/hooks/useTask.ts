import { useState } from "react";
import { Subtask } from "../@types/subtask";
import { Task } from "../@types/task";
import { useToast } from "../components/ui/use-toast";
import { useTaskContext } from "../contexts/TaskContext";
import { api } from "../lib/axios";

export default function useTask() {
  const [isLoading, setIsLoading] = useState(false);
  const { setTasks } = useTaskContext();
  const { toast } = useToast();

  async function getTasks(query?: string) {
    try {
      setIsLoading(true);
      const res = await api.get(`todo?filter=${query}`);
      setTasks(res.data);
      return res.data;
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Error",
        description: "Error fetching tasks",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateNewTask(event: React.FormEvent, label: string) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await api.post("todo", {
        label: label,
      });
      getTasks();
      toast({
        title: "Success!",
        description: "Task created successfully.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error creating task",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function markTaskAsDone(id: string) {
    try {
      setIsLoading(true);
      await api.patch(`todo/${id}/done`);
      toast({
        title: "Success!",
      });
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Error",
        description: "Error updating task.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function markTaskAsUndone(id: string) {
    try {
      setIsLoading(true);
      await api.patch(`todo/${id}/undone`);
      toast({
        title: "Success!",
      });
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Error",
        description: "Error updating task.",
      });
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
      toast({
        title: "Success!",
        description: "Subtask created successfully.",
      });
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Error",
        description: "Error creating subtask",
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteTask({ id }: Task) {
    try {
      setIsLoading(true);
      await api.delete(`todo/${id}`);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      toast({
        title: "Success!",
        description: "Task deleted successfully.",
      });
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Error",
        description: "Error deleting subtask",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    getTasks,
    isLoading,
    setIsLoading,
    markTaskAsDone,
    markTaskAsUndone,
    createSubtask,
    handleCreateNewTask,
    deleteTask,
  };
}
