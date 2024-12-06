import { Task, CreateTask, UpdateTask } from '../types'

const STORAGE_KEY = 'todo-app-tasks'

export const storage = {
  getTasks: (): Task[] => {
    const tasks = localStorage.getItem(STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
  },

  addTask: (task: CreateTask): Task => {
    const tasks = storage.getTasks()
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...tasks, newTask]))
    return newTask
  },

  updateTask: (id: string, update: UpdateTask): Task | null => {
    const tasks = storage.getTasks()
    const taskIndex = tasks.findIndex(t => t.id === id)
    if (taskIndex === -1) return null

    const updatedTask = { ...tasks[taskIndex], ...update }
    tasks[taskIndex] = updatedTask
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return updatedTask
  },

  deleteTask: (id: string): boolean => {
    const tasks = storage.getTasks()
    const filteredTasks = tasks.filter(t => t.id !== id)
    if (filteredTasks.length === tasks.length) return false
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks))
    return true
  }
}