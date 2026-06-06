import { useState, useEffect } from 'react';
import { validateFormInput } from '../utils/validateTask';
import './TaskForm.css';

/**
 * TaskForm Component - Câu 2: Kiểm tra và validate dữ liệu input
 * - Validate độ dài title (3-100 ký tự)
 * - Validate priority hợp lệ
 * - Hiển thị error message chi tiết
 */

const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

function TaskForm({ onAdd, onUpdate, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setError('');
      setCharCount(editingTask.title.length);
    }
  }, [editingTask]);

  // Update character count when title changes
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setCharCount(value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Sử dụng hàm validate từ utils (Câu 2)
    const validation = validateFormInput(title, priority);

    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    const trimmed = title.trim();

    if (editingTask) {
      onUpdate({ ...editingTask, title: trimmed, priority });
    } else {
      onAdd(trimmed, priority);
      setTitle('');
      setPriority('High');
      setCharCount(0);
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
        <div className="input-wrapper">
          <input
            id="task-input"
            value={title}
            onChange={handleTitleChange}
            placeholder="Type your task here..."
            maxLength={120}
          />
          <span className={`char-count ${charCount > 100 ? 'warning' : ''}`}>
            {charCount}/100
          </span>
        </div>

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
