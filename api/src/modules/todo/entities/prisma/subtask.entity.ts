import { Subtask } from '@prisma/client';

export class SubtaskEntity implements Subtask {
  id: string;
  label: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  todoId: string;
}
