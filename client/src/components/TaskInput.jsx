function TaskInput({ 
  title,
  setTitle,
  priority,
  setPriority,
  addTask 
}) {
  return (
    <div className="inputRow">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />

      <select 
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="prioritySelect"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={addTask}>
        Add
      </button>
    </div>
  );
}

export default TaskInput;