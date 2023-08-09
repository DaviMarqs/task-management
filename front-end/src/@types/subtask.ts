export interface Subtask {
  id?: string;
  label: string;
  done?: boolean;
  created_at?: string;
  updated_at?: string;
  todoId: string;
}
