import { useState } from "react";
import { Task } from "../../@types/task";
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
}

export function CardComponent({ task }: CardComponentProps) {
  const [addingNewSubtask, setAddingNewSubtask] = useState(false);
  return (
    <>
      <Card className="w-72 h-64 m-8 bg-purple-500 ring-1 ring-purple-600 hover:bg-purple-400 ">
        <CardHeader className="flex align-center justify-center">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              <h1>{task.label}</h1>
            </CardTitle>
            <Checkbox className="text-gray-50" />
          </div>

          <CardDescription className="text-gray-50">
            <p className="mb-2 font-semibold text-yellow-300">
              {task.created_at}
            </p>
            <p className="font-bold mb-1">SUBTASK 1</p>
            <p className="font-bold mb-1">Subtask 2</p>
            <p className="font-bold mb-1">Subtask 3</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {addingNewSubtask ? (
            <AddSubtask setAddingNewSubtask={setAddingNewSubtask} />
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
