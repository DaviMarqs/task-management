import { SubtaskEntity } from './subtask.entity';

export class TodoEntity {
  id: string;
  label: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  subtasks?: SubtaskEntity[];
}
