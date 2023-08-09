import { Check, X } from "lucide-react";
import { useState } from "react";
import useTask from "../../hooks/useTask";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AddSubtaskProps {
  setAddingNewSubtask: (addingNewsubtask: boolean) => void;
  taskId: string;
  createSubtask: (subtask: { label: string; todoId: string }) => void;
}

export function AddSubtask({ setAddingNewSubtask, taskId }: AddSubtaskProps) {
  const [subtask, setSubtask] = useState("");
  const { createSubtask, setIsLoading } = useTask();

  async function handleAddSubtask() {
    try {
      await createSubtask({
        label: subtask,
        todoId: taskId,
      });
      setSubtask("");
      setAddingNewSubtask(false);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleAddSubtask}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        className="text-gray-950 font-bold placeholder:text-purple-800"
        type="text"
        placeholder="Add your subtask"
        onChange={(e) => setSubtask(e.target.value)}
      />
      <Button
        type="submit"
        className="bg-transparent text-gray-950 hover:bg-transparent"
      >
        {subtask === "" ? <X /> : <Check />}
      </Button>
    </form>
  );
}
