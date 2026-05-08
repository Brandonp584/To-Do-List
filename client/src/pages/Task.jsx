import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tasks.css";

import Toast from "../components/Toast";
import TaskFilters from "../components/TaskFilters";
import TaskInput from "../components/TaskInput";
import TaskCard from "../components/TaskCard";
import SkeletonLoader from "../components/SkeletonLoader";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || "User";

  const fetchTasks = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setTasks(data);
          setLoading(false);
        }, 250);
      })
      .catch(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [token, navigate, fetchTasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const addTask = async () => {
    if (!title) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
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
    await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
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
    await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`, {
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

  const updateTasks = (updatedTasks) => {
    setTasks(prev =>
      prev.map(t =>
        t._id === updatedTasks._id ? updatedTasks : t
      )
    );
  }

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

        <TaskFilters filter={filter} setFilter={setFilter} />

        <TaskInput
          title={title}
          setTitle={setTitle}
          addTask={addTask}
        />

        <div className="taskList">
          {loading ? (
            <SkeletonLoader />
          ) : filteredTasks.length === 0 ? (
            <p className="empty">No tasks yet. Add one.</p>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                updateTask={updateTasks}
              />
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