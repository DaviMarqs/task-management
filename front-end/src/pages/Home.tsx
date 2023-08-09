import { useEffect } from "react";
import { Task } from "../@types/task";
import { CardComponent } from "../components/Card";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useTaskContext } from "../contexts/TaskContext";
import useTask from "../hooks/useTask";

export function Home() {
  const { getTasks, isLoading, createSubtask } = useTask();
  const { tasks } = useTaskContext();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-950 flex-col">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <main className="grid grid-cols-1 sm:grid-cols-2 mx-auto lg:grid-cols-3">
            {tasks.map((task: Task) => (
              <CardComponent key={task.id} task={task} createSubtask={createSubtask} />
            ))}
          </main>
        )}
      </div>
    </>
  );
}
