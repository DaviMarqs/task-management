import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useState } from "react";
import useTask from "../../hooks/useTask";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";

interface AddTaskProps {
  addingNewTask: boolean;
  setAddingNewTask: (addingNewTask: boolean) => void;
}

export function AddTask({ addingNewTask, setAddingNewTask }: AddTaskProps) {
  const [taskToAdd, setTaskToAdd] = useState("");
  const { handleCreateNewTask } = useTask();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await handleCreateNewTask(event, taskToAdd);
    setAddingNewTask(false);
    setTaskToAdd("");
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Dialog onOpenChange={() => setAddingNewTask(false)} open={addingNewTask}>
        <div className="w-full flex justify-center">
          <DialogContent className="m-4 border-2 border-gray-100 rounded-3xl text-gray-100 sm:min-w-[325px] lg:w-[1024px] ">
            <DialogHeader className="p-5 lg:mx-20">
              <DialogTitle className="text-2xl">ADD YOUR TASK!</DialogTitle>
              <DialogDescription>
                Describe the title of your task below!
              </DialogDescription>
            </DialogHeader>
            <div className="w-[80%] flex mx-auto text-gray-950">
              <Input
                id="task"
                value={taskToAdd}
                className="col-span-3"
                onChange={(e) => setTaskToAdd(e.target.value)}
                maxLength={40}
              />
            </div>
            <DialogFooter>
              <Button
                className="my-4 mx-7 lg:mx-[98px] bg-transparent border-2 border-gray-100"
                type="submit"
                disabled={!taskToAdd}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </form>
  );
}
