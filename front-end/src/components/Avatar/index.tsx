import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AvatarIcon() {
  return (
    <Avatar>
      <AvatarFallback>DM</AvatarFallback>
      <AvatarImage src="https://github.com/DaviMarqs.png" />
    </Avatar>
  );
}
