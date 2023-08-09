import { Todo as TodoModel } from '@prisma/client';
import { SubtaskEntity } from './subtask.entity';

export class TodoEntity implements TodoModel {
  id: string;
  label: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  subtasks?: SubtaskEntity[];
}
