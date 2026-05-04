function TaskInput({ title, setTitle, addTask }) {
  return (
    <div className="inputRow">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />

      <button onClick={addTask}>
        Add
      </button>
    </div>
  );
}

export default TaskInput;