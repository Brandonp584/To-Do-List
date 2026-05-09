const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: token
});

export const getTasks = async (token) => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: token
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
};

export const createTask = async (title, priority, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ title, priority })
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
};

export const deleteTaskById = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token
    }
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return res.json();
};

export const toggleTaskComplete = async (task, token) => {
  const res = await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({
      completed: !task.completed
    })
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.json();
};

export const reorderTasks = async (orderedTasks, token) => {
  const res = await fetch(`${API_URL}/reorder`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify({
      tasks: orderedTasks.map((task, index) => ({
        id: task._id,
        order: index
      }))
    })
  });

  if (!res.ok) {
    throw new Error("Failed to reorder tasks");
  }

  return res.json();
};