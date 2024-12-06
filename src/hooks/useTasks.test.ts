import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTasks } from './useTasks'
import { storage } from '../lib/storage'

vi.mock('../lib/storage', () => ({
  storage: {
    getTasks: vi.fn(),
    addTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
  }
}))

describe('useTasks', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    ;(storage.getTasks as any).mockReturnValue([])
  })

  it('initializes with empty tasks array and loading state', () => {
    const { result } = renderHook(() => useTasks())
    
    expect(result.current.tasks).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('handles adding a task successfully', async () => {
    const newTask = {
      id: '1',
      title: 'Test Task',
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    ;(storage.addTask as any).mockReturnValue(newTask)
    
    const { result } = renderHook(() => useTasks())
    
    await act(async () => {
      result.current.addTask({ title: 'Test Task' })
    })
    
    expect(result.current.tasks).toEqual([newTask])
  })

  it('handles task deletion', async () => {
    const task = {
      id: '1',
      title: 'Test Task',
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    ;(storage.getTasks as any).mockReturnValue([task])
    ;(storage.deleteTask as any).mockReturnValue(true)
    
    const { result } = renderHook(() => useTasks())
    
    await act(async () => {
      result.current.deleteTask('1')
    })
    
    expect(result.current.tasks).toEqual([])
  })

  it('handles errors when loading tasks', () => {
    ;(storage.getTasks as any).mockImplementation(() => {
      throw new Error('Failed to load tasks')
    })
    
    const { result } = renderHook(() => useTasks())
    
    expect(result.current.error).toBe('Failed to load tasks')
  })

  it('handles task completion toggle', async () => {
    const task = {
      id: '1',
      title: 'Test Task',
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    const updatedTask = { ...task, completed: true }
    
    ;(storage.getTasks as any).mockReturnValue([task])
    ;(storage.updateTask as any).mockReturnValue(updatedTask)
    
    const { result } = renderHook(() => useTasks())
    
    await act(async () => {
      result.current.toggleTask('1')
    })
    
    expect(storage.updateTask).toHaveBeenCalledWith('1', { completed: true })
    expect(result.current.tasks[0].completed).toBe(true)
  })
})