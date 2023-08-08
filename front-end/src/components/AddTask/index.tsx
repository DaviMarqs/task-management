import { Textarea } from "../ui/textarea";

export function AddTask() {
  return (
    <div className="flex flex-col">
      <div className="text-yellow-300">Type your task here</div>
      <Textarea className="bg-transparent min-h-min" />
    </div>
  );
}
