import { useState, useEffect } from 'react'
import { Task, CreateTask, UpdateTask } from '../types'
import { storage } from '../lib/storage'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(storage.getTasks())
  }, [])

  const addTask = (task: CreateTask) => {
    const newTask = storage.addTask(task)
    setTasks(prev => [...prev, newTask])
    return newTask
  }

  const updateTask = (id: string, update: UpdateTask) => {
    const updatedTask = storage.updateTask(id, update)
    if (updatedTask) {
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task))
    }
    return updatedTask
  }

  const deleteTask = (id: string) => {
    const success = storage.deleteTask(id)
    if (success) {
      setTasks(prev => prev.filter(task => task.id !== id))
    }
    return success
  }

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      return updateTask(id, { completed: !task.completed })
    }
    return null
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  }
}