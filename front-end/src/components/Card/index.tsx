import { useState } from "react";
import { Task } from "../../@types/task";
import useTask from "../../hooks/useTask";
import { formatDate } from "../../utils/formatDate";
import { AddSubtask } from "../AddSubtask";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
interface CardComponentProps {
  task: Task;
  createSubtask: (subtask: { label: string; todoId: string }) => void;
}

export function CardComponent({ task, createSubtask }: CardComponentProps) {
  const [selectedTask, setSelectedTask] = useState(task);
  const [addingNewSubtask, setAddingNewSubtask] = useState(false);
  const { markTaskAsDone, markTaskAsUndone } = useTask();

  function handleChangeStatus() {
    if (selectedTask.done) {
      markTaskAsUndone(selectedTask.id);
      setSelectedTask((prevTask) => ({ ...prevTask, done: false }));
      return;
    }
    markTaskAsDone(selectedTask.id);
    setSelectedTask((prevTask) => ({ ...prevTask, done: true }));
  }

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  return (
    <>
      <Card
        className={`w-72 m-8 ${
          hasSubtasks ? "h-auto" : "h-48"
        } bg-purple-500 ring-1 ring-purple-600 hover:bg-purple-400 `}
      >
        <CardHeader className="flex align-center justify-center">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              <h1>{selectedTask.label}</h1>
            </CardTitle>
            <Checkbox
              checked={selectedTask.done}
              onClick={handleChangeStatus}
              className="text-gray-50"
            />
          </div>

          <CardDescription className="text-gray-50">
            <p className="mb-2 font-semibold text-yellow-300">
              {formatDate(selectedTask.created_at)}
            </p>
            <div
              className={`max-h-20 overflow-y-auto ${
                selectedTask.done ? "line-through text-slate-900" : ""
              }`}
            >
              {selectedTask?.subtasks?.map((subtask) => (
                <p className="font-bold mb-1" key={subtask.id}>
                  {`• ${subtask.label.toUpperCase()}`}
                </p>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {addingNewSubtask ? (
            <AddSubtask
              taskId={selectedTask.id}
              setAddingNewSubtask={setAddingNewSubtask}
              createSubtask={createSubtask}
            />
          ) : (
            <Button
              variant="link"
              className="text-yellow-300 font-bold hover:text-gray-950"
              onClick={() => setAddingNewSubtask(true)}
            >
              CREATE NEW SUBTASK
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
}
