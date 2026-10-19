let nextId = 1;
const tasks = [];

function validateTitle(title) {
  if (typeof title !== "string" || !title.trim()) {
    throw new TypeError("Task title must be a non-empty string");
  }

  return title.trim();
}

export function createTask(title) {
  const task = {
    id: nextId++,
    title: validateTitle(title),
    completed: false
  };

  tasks.push(task);
  return task;
}

export function listTasks() {
  return tasks.map((task) => ({ ...task }));
}

export function updateTask(id, updates) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return null;
  }

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    throw new TypeError("Updates must be an object");
  }

  const allowedFields = ["title", "completed"];
  const keys = Object.keys(updates);

  if (keys.some((key) => !allowedFields.includes(key))) {
    throw new TypeError("Updates contain unsupported fields");
  }

  if ("title" in updates) {
    updates = { ...updates, title: validateTitle(updates.title) };
  }

  if ("completed" in updates && typeof updates.completed !== "boolean") {
    throw new TypeError("Completed must be a boolean");
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