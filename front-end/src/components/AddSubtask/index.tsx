import { Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AddSubtaskProps {
  setAddingNewSubtask: (addingNewsubtask: boolean) => void;
}

export function AddSubtask({ setAddingNewSubtask }: AddSubtaskProps) {
  const [subtask, setSubtask] = useState("");

  function handleAddSubtask(event: React.FormEvent) {
    event?.preventDefault();
    if (!subtask) {
      setAddingNewSubtask(false);
      return;
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
