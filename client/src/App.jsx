import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do-List</h1>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
        </div>
      ))}
    </div>
  );
}


export default App;
