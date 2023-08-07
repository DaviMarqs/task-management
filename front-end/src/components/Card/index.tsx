import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export function CardComponent() {
  return (
    <Card className="w-72 h-40 m-8 bg-purple-400 ring-1 ring-purple-600 hover:bg-purple-900 cursor-pointer">
      <CardHeader className="flex align-center justify-center">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            <h1>Limpar o quarto</h1>
          </CardTitle>
          <Checkbox className="text-gray-50 radi" />
        </div>

        <CardDescription className="text-gray-50">07/08/2023</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-50">Subtask 1...</p>
      </CardContent>
    </Card>
  );
}
