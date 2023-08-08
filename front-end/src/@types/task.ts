export interface Task {
  id: string;
  label: string;
  done: boolean;
  updated_at: string;
  created_at: string;

  subtasks?: Task[];
}
