import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onDelete, onToggleStatus, onEdit }) {
  if (!tasks.length) {
    return <div className="no-tasks">Chưa có task nào. Hãy thêm task mới.</div>;
  }

  return (
    <div className="task-list-card">
      <div className="task-list-title">
        <h2>Danh sách nhiệm vụ</h2>
        <span>{tasks.length} tasks</span>
      </div>
      <div className="task-items">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
