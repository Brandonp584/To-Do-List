import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tasks.css";
import Toast from "../components/Toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(() => {
    fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data));
  }, [token]);

  // Protect page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [navigate, fetchTasks]);

  const addTask = async () => {
    if (!title) return;

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ title })
    });

    setTitle("");
    setToast("Task added successfully!");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });

    setToast("Task deleted successfully!");
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    });

    setToast(task.completed ? "Marked incomplete!" : "Marked complete!");
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app">
      <div className="card">

        <div className="header">
          <h1>My Tasks</h1>
          <button className="logoutBtn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="inputRow">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="taskList">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add one 🚀</p>
          ) : (
            tasks.map(task => (
              <div className="taskCard" key={task._id}>
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
            ))
          )}
        </div>
        {toast && (
          <Toast
            message={toast}
            onClose={() => setToast("")}
          />
        )}

      </div>
    </div>
  );
}

export default Tasks;