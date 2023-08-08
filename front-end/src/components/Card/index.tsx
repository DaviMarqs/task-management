import { useState } from "react";
import { AddTask } from "../AddTask";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export function CardComponent() {
  const [addingNewTask, setAddingNewTask] = useState(false);
  return (
    <>
      {/* hover:bg-purple-900 cursor-pointer */}
      <Card className="w-72 h-64 m-8 bg-purple-500 ring-1 ring-purple-600">
        <CardHeader className="flex align-center justify-center">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              <h1>Limpar o quarto</h1>
            </CardTitle>
            <Checkbox className="text-gray-50" />
          </div>

          <CardDescription className="text-gray-50">
            <p className="mb-2 font-semibold text-yellow-300">07/08/2023</p>
            <p className="font-bold mb-1">SUBTASK 1</p>
            <p className="font-bold mb-1">Subtask 2</p>
            <p className="font-bold mb-1">Subtask 3</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {addingNewTask ? (
            <AddTask />
          ) : (
            <Button
              variant="link"
              className="text-yellow-300 hover:text-gray-950"
              onClick={() => setAddingNewTask(true)}
            >
              CREATE NEW SUBTASK
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
}
