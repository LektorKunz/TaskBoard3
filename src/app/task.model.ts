export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  completed: boolean;
}
