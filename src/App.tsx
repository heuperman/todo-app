import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'

export function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Todo App</h1>
      <div className="mb-8">
        <TaskForm onSubmit={addTask} />
      </div>
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}