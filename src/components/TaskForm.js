import { useState, useEffect } from 'react';
import './TaskForm.css';

const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

function TaskForm({ onAdd, onUpdate, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setError('');
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Vui lòng nhập tên task.');
      return;
    }
    if (trimmed.length > 100) {
      setError('Tên Task không được quá 100 kí tự.');
      return;
    }

    if (editingTask) {
      onUpdate({ ...editingTask, title: trimmed, priority });
    } else {
      onAdd(trimmed, priority);
      setTitle('');
      setPriority('High');
    }
    setError('');
  };

  return (
    <div className="task-form-card">
      <div className="task-form-header">
        <h2>{editingTask ? 'Chỉnh sửa Task' : 'Add Task'}</h2>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label htmlFor="task-input">Task</label>
        <input
          id="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type your task here..."
          maxLength={120}
        />
        <label>Priority</label>
        <div className="priority-buttons">
          {PRIORITY_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              className={option === priority ? `priority-btn active ${option.toLowerCase()}` : `priority-btn ${option.toLowerCase()}`}
              onClick={() => setPriority(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {error && <div className="task-form-error">{error}</div>}
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {editingTask ? 'Lưu' : 'Add'}
          </button>
          {editingTask && (
            <button type="button" className="cancel-btn" onClick={onCancelEdit}>
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
