let nextId = 1;
const tasks = [];

export function createTask(title) {
  const task = {
    id: nextId++,
    title,
    completed: false
  };

  tasks.push(task);
 return { ...task };
}

export function listTasks() {
  return tasks.map((task) => ({ ...task }));
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