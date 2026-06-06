import './TaskItem.css';

function TaskItem({ task, onDelete, onToggleStatus, onEdit }) {
  const priorityClass = task.priority.toLowerCase();

  return (
    <div className="task-item">
      <div className="task-item-main">
        <div>
          <p className="task-item-title">Task</p>
          <p className="task-item-title">{task.title}</p>
          <div className="task-item-meta">
            <span className={`task-priority ${priorityClass}`}>{task.priority}</span>
            <span className={`task-status ${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</span>
          </div>
        </div>
        <div className="task-item-actions">
          <button className="icon-btn" onClick={() => onToggleStatus(task.id)} type="button" title="Chuyển trạng thái">
            ↻
          </button>
          <button className="icon-btn edit" onClick={() => onEdit(task)} type="button" title="Sửa task">
            ✎
          </button>
          <button className="icon-btn delete" onClick={() => onDelete(task.id)} type="button" title="Xóa task">
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
