import { useState } from "react";
import { api } from "../lib/axios";

export default function useTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      setIsLoading(true);
      const res = await api.get("todo");
      setTasks(res.data);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return { getTasks, tasks, setTasks, isLoading };
}
