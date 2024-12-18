export interface Task {
  id: number;
  title: string;
  completed: boolean;
  color: string;
}

export type TaskFormData = Omit<Task, "id" | "completed">;
