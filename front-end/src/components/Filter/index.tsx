import { useEffect, useState } from "react";
import useTask from "../../hooks/useTask";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Filter() {
  const [filterBy, setFilterBy] = useState("newest");
  const { getTasks } = useTask();

  useEffect(() => {
    getTasks(filterBy);
  }, [filterBy]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-24" variant="outline">
          Filter By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select a filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filterBy} onValueChange={setFilterBy}>
          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="not_done">
            Not done
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
