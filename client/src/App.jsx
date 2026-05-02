import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Get Tasks
  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //CREATE task
  const addTask = async () => {
    if (!title) return;

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });

    setTitle("");
    fetchTasks();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do-List</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Task"
      />

      <button onClick={addTask}>Add Task</button>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
        </div>
      ))}
    </div>
  );
}


export default App;
