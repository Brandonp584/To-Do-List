function TaskCard({ task, deleteTask, toggleComplete }) {
  return (
    <div className="taskCard">
      <span
        className={task.completed ? "done" : ""}
        onClick={() => toggleComplete(task)}
      >
        {task.title}
      </span>

      {task.completed && (
        <small className="badge">Done</small>
      )}

      <button onClick={() => deleteTask(task._id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskCard;