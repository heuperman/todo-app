import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TaskForm } from './TaskForm'

describe('TaskForm', () => {
  it('renders input fields and submit button', () => {
    render(<TaskForm onSubmit={() => {}} />)
    
    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument()
    expect(screen.getByText('Add Task')).toBeInTheDocument()
  })

  it('submits form with correct data', () => {
    const handleSubmit = vi.fn()
    render(<TaskForm onSubmit={handleSubmit} />)
    
    const titleInput = screen.getByPlaceholderText('Task title')
    const descriptionInput = screen.getByPlaceholderText('Description (optional)')
    
    fireEvent.change(titleInput, { target: { value: 'Test Task' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })
    fireEvent.submit(screen.getByText('Add Task'))
    
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description'
    })
  })

  it('clears inputs after submission', () => {
    render(<TaskForm onSubmit={() => {}} />)
    
    const titleInput = screen.getByPlaceholderText('Task title')
    const descriptionInput = screen.getByPlaceholderText('Description (optional)')
    
    fireEvent.change(titleInput, { target: { value: 'Test Task' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })
    fireEvent.submit(screen.getByText('Add Task'))
    
    expect(titleInput).toHaveValue('')
    expect(descriptionInput).toHaveValue('')
  })
})