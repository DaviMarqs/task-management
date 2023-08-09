import { Subtask as SubtaskModel } from '@prisma/client';

export class SubtaskEntity implements SubtaskModel {
  id: string;
  label: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  todoId: string;
}
