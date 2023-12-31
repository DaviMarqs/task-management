import { Trash2Icon } from "lucide-react";
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
  const { markTaskAsDone, markTaskAsUndone, deleteTask } = useTask();

  function handleChangeStatus() {
    if (selectedTask.done) {
      markTaskAsUndone(selectedTask.id);
      setSelectedTask((prevTask) => ({ ...prevTask, done: false }));
      return;
    }
    markTaskAsDone(selectedTask.id);
    setSelectedTask((prevTask) => ({ ...prevTask, done: true }));
  }

  function handleDeleteTask() {
    deleteTask(selectedTask);
  }

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const taskDone = selectedTask.done;
  return (
    <>
      <Card
        className={`w-72 m-8 ${
          hasSubtasks ? "h-auto" : "h-48"
        } bg-purple-500 ring-1 ring-purple-600 hover:bg-purple-400 `}
      >
        <CardHeader className="flex align-center justify-center">
          <div className="flex items-center justify-between">
            <CardTitle className="w-1/2">
              <h1 className="text-sm break-words">{selectedTask.label}</h1>
            </CardTitle>
            <div className="flex items-center justify-around">
              <Checkbox
                checked={selectedTask.done}
                onClick={handleChangeStatus}
                className="text-gray-50 mr-1"
              />
              <Button
                className="min-w-0 w-12 ml-2 bg-transparent text-gray-950 hover:bg-transparent hover:text-gray-50"
                onClick={handleDeleteTask}
              >
                <Trash2Icon />
              </Button>
            </div>
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
                <p
                  className="font-bold mb-1 text-sm break-words"
                  key={subtask.id}
                >
                  {`•${subtask.label.toUpperCase()}`}
                </p>
              ))}
            </div>
          </CardDescription>
        </CardHeader>

        {!taskDone && (
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
        )}
      </Card>
    </>
  );
}
