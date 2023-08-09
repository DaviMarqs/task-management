import { Plus } from "lucide-react";
import { useState } from "react";
import { AddTask } from "../AddTask";
import { AvatarIcon } from "../Avatar";
import { Filter } from "../Filter";
import { Button } from "../ui/button";

export function Header() {
  const [addingNewTask, setAddingNewTask] = useState(false);

  return (
    <>
      <div className="h-12 w-full gap-5 px-5 py-10 mb-8 bg-gray-950 flex justify-between items-center">
        <AvatarIcon />
        <div className="flex items-center gap-5">
          <Filter />
          <Button
            onClick={() => setAddingNewTask(true)}
            className="w-14 h-12 bg-transparent hover:bg-transparent"
          >
            <Plus size={32} className="text-gray-100" />
          </Button>
        </div>
      </div>
      <AddTask
        addingNewTask={addingNewTask}
        setAddingNewTask={setAddingNewTask}
      />
    </>
  );
}
