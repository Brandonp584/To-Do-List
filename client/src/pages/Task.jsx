import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tasks.css";
import Toast from "../components/Toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const name = localStorage.getItem("name") || "User";

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(() => {
    fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setTasks(data);
          setLoading(false);
        }, 1000);
      })
      .catch(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [navigate, fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

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
    setLoading(true);
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
    setLoading(true);
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
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <div className="app">
      <div className="card">

        <div className="header">
          <div>
            <p className="welcomeText">Welcome, {name}</p>
            <h1>My Tasks</h1>
          </div>

          <button className="logoutBtn" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          <button className={filter === "all" ? "activeFilter" : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "active" ? "activeFilter" : ""} onClick={() => setFilter("active")}>
            Active
          </button>
          <button className={filter === "completed" ? "activeFilter" : ""} onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>

        {/* Input */}
        <div className="inputRow">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* TASK LIST */}
        <div className="taskList">

          {/* 🔥 SKELETON LOADING */}
          {loading ? (
            <>
              <div className="skeletonCard"></div>
              <div className="skeletonCard"></div>
              <div className="skeletonCard"></div>
            </>
          ) : filteredTasks.length === 0 ? (
            <p className="empty">No tasks yet. Add one 🚀</p>
          ) : (
            filteredTasks.map(task => (
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