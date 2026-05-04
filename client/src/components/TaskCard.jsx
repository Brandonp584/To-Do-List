import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

function TaskCard({ task, deleteTask, toggleComplete }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const token = localStorage.getItem("token");

  const saveEdit = async () => {
    if (!newTitle.trim()) return;

    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        title: newTitle
      })
    });

    setEditing(false);
  };

  return (
    <div className="taskCard">

      {/* LEFT SIDE */}
      <div className="taskContent">
        {editing ? (
          <input
            className="editInput"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
            }}
            autoFocus
          />
        ) : (
          <span
            className={task.completed ? "done" : ""}
            onClick={() => toggleComplete(task)}
          >
            {task.title}
          </span>
        )}

        {task.completed && (
          <small className="badge">Done</small>
        )}
      </div>

      {/* RIGHT ACTIONS */}
      <div className="taskActions">

        <button
          className="editBtn"
          onClick={() => setEditing(true)}
        >
          <FiEdit2 />
        </button>

        <button
          className="deleteBtn"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;