export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
}

export type CreateTask = Omit<Task, 'id' | 'createdAt' | 'completed'>
export type UpdateTask = Partial<Omit<Task, 'id' | 'createdAt'>>