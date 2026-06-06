import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './TaskApp.css';

const STORAGE_KEY = 'exam2026-task-list';
const STATUS_ORDER = ['To Do', 'In Progress', 'Done'];

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
          return;
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.tasks) && data.tasks.length > 0) {
          setTasks(data.tasks.map((task, index) => ({
            ...task,
            id: task.id ?? Date.now() + index,
          })));
        } else {
          setError('Dữ liệu ban đầu không hợp lệ.');
        }
      })
      .catch(() => {
        setError('Không thể tải dữ liệu ban đầu.');
      });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, priority) => {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      status: 'To Do',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const nextIndex = (STATUS_ORDER.indexOf(task.status) + 1) % STATUS_ORDER.length;
        return { ...task, status: STATUS_ORDER[nextIndex] };
      })
    );
  };

  return (
    <div className="task-app">
      <header className="task-header">
        <div>
          {/* <p className="task-subtitle">Task List</p> */}
          <h1>TASK LIST</h1>
        </div>
        <button className="task-header-button" onClick={() => window.document.getElementById('task-input')?.focus()}>
          + Add Task
        </button>
      </header>

      {error && <div className="task-error">{error}</div>}

      <div className="task-grid">
        <section className="task-list-panel">
          <TaskList tasks={tasks} onDelete={deleteTask} onToggleStatus={toggleStatus} onEdit={setEditingTask} />
        </section>
        <section className="task-form-panel">
          <TaskForm onAdd={addTask} onUpdate={updateTask} editingTask={editingTask} onCancelEdit={() => setEditingTask(null)} />
        </section>
      </div>
    </div>
  );
}

export default TaskApp;
