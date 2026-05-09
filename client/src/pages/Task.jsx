import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tasks.css";

import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  sortableKeyboardCoordinates,
  arrayMove
} from "@dnd-kit/sortable";

import Toast from "../components/Toast";
import TaskFilters from "../components/TaskFilters";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

import {
  getTasks,
  createTask,
  deleteTaskById,
  toggleTaskComplete,
  reorderTasks
} from "../services/taskService";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [priority, setPriority] = useState("medium");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || "User";

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const fetchTasks = useCallback(() => {
    getTasks(token)
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

  const saveTaskOrder = async (orderedTasks) => {
    await reorderTasks(orderedTasks, token);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(task => task._id === active.id);
    const newIndex = tasks.findIndex(task => task._id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);

    setTasks(reorderedTasks);

    try {
      await saveTaskOrder(reorderedTasks);
      setToast("Task order updated!");
    } catch {
      setToast("Could not save task order.");
      fetchTasks();
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const newTask = await createTask(title, priority, token);

      setTasks(prev => [newTask, ...prev]);
      setTitle("");
      setPriority("medium");
      setToast("Task added successfully!");
    } catch {
      setToast("Could not add task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskById(id, token);

      setTasks(prev => prev.filter(task => task._id !== id));
      setToast("Task deleted successfully!");
    } catch {
      setToast("Could not delete task.");
    }
  };

  const toggleComplete = async (task) => {
    try {
      await toggleTaskComplete(task, token);

      setToast(task.completed ? "Marked incomplete!" : "Marked complete!");
      fetchTasks();
    } catch {
      setToast("Could not update task.");
    }
  };

  const updateTasks = (updatedTasks) => {
    setTasks(prev =>
      prev.map(t =>
        t._id === updatedTasks._id ? updatedTasks : t
      )
    );
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

        <TaskFilters filter={filter} setFilter={setFilter} />

        <TaskInput
          title={title}
          setTitle={setTitle}
          priority={priority}
          setPriority={setPriority}
          addTask={addTask}
        />

        <TaskList
          loading={loading}
          filteredTasks={filteredTasks}
          sensors={sensors}
          handleDragEnd={handleDragEnd}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          updateTasks={updateTasks}
        />

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