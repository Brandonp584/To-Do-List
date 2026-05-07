import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

function TaskCard({ task, deleteTask, toggleComplete, updateTask }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const token = localStorage.getItem("token");

  const saveEdit = async () => {
    if (!newTitle.trim()) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        title: newTitle
      })
    });

    const updatedTask = await res.json();

    // update UI without reload
    updateTask(updatedTask);

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
            onClick={() => !editing && toggleComplete(task)}
          >
            {task.title}
          </span>
        )}

        {task.completed && (
          <small className="badge">Done</small>
        )}
      </div>

      {/* RIGHT SIDE */}
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