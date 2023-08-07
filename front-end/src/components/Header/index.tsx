import { Plus } from "lucide-react";
import { AvatarIcon } from "../Avatar";

export function Header() {
  return (
    <div className="h-12 w-full bg-gray-950 flex justify-between items-center gap-5 px-5 py-10">
      <AvatarIcon />
      <Plus size={32} className="text-gray-100" />
    </div>
  );
}
