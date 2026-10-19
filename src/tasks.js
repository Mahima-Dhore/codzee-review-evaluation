let nextId = 1;
const tasks = [];

export function createTask(title) {
  const task = {
    id: nextId++,
    title,
    completed: false
  };

  tasks.push(task);
  return task;
}

export function listTasks({ query = "", completed } = {}) {
  if (typeof query !== "string") {
    throw new TypeError("Search query must be a string");
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    throw new TypeError("Completed filter must be a boolean");
  }

  const normalizedQuery = query.trim().toLowerCase();

  return tasks
    .filter((task) => {
      const matchesQuery = task.title
        .toLowerCase()
        .includes(normalizedQuery);

      const matchesStatus =
        completed === undefined || task.completed === completed;

      return matchesQuery && matchesStatus;
    })
    .map((task) => ({ ...task }));
}

export function updateTask(id, updates) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return null;
  }

  Object.assign(task, updates);
  return { ...task };
}

export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}