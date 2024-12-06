import { useState, useEffect } from 'react'
import { Task, CreateTask, UpdateTask } from '../types'
import { storage } from '../lib/storage'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setTasks(storage.getTasks())
    } catch (e) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  const addTask = (task: CreateTask) => {
    try {
      const newTask = storage.addTask(task)
      setTasks(prev => [...prev, newTask])
      return newTask
    } catch (e) {
      setError('Failed to add task')
      return null
    }
  }

  const updateTask = (id: string, update: UpdateTask) => {
    try {
      const updatedTask = storage.updateTask(id, update)
      if (updatedTask) {
        setTasks(prev => prev.map(task => task.id === id ? updatedTask : task))
      }
      return updatedTask
    } catch (e) {
      setError('Failed to update task')
      return null
    }
  }

  const deleteTask = (id: string) => {
    try {
      const success = storage.deleteTask(id)
      if (success) {
        setTasks(prev => prev.filter(task => task.id !== id))
      }
      return success
    } catch (e) {
      setError('Failed to delete task')
      return false
    }
  }

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      return updateTask(id, { completed: !task.completed })
    }
    return null
  }

  const clearError = () => setError(null)

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearError
  }
}