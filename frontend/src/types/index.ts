export interface Task {
  id: string;
  title: string;
  description: string;
  column: 'todo' | 'inprogress' | 'done';
  rank: string;
  createdAt: string;
  updatedAt: string;
}