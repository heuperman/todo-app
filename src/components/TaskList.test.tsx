import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TaskList } from './TaskList'
import { Task } from '../types'

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Test Task 1',
    description: 'Description 1',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Test Task 2',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]

describe('TaskList', () => {
  it('renders tasks in correct order', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onToggle={() => {}}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    )

    const tasks = screen.getAllByRole('heading')
    expect(tasks).toHaveLength(2)
    expect(tasks[0]).toHaveTextContent('Test Task 1')
    expect(tasks[1]).toHaveTextContent('Test Task 2')
  })

  it('displays completed tasks last', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onToggle={() => {}}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    )

    const tasks = screen.getAllByRole('heading')
    const firstTask = tasks[0].textContent
    const secondTask = tasks[1].textContent

    expect(firstTask).toBe('Test Task 1')
    expect(secondTask).toBe('Test Task 2')
    expect(tasks[1]).toHaveClass('line-through')
  })
})