import test from "node:test";
import assert from "node:assert/strict";
import {
  createTask,
  listTasks,
  updateTask,
  deleteTask
} from "../src/tasks.js";

test("creates and lists tasks", () => {
  const task = createTask("Learn Codzee");

  assert.equal(task.title, "Learn Codzee");
  assert.equal(task.completed, false);
  assert.ok(listTasks().some((item) => item.id === task.id));
});

test("updates an existing task", () => {
  const task = createTask("Write tests");

  const updated = updateTask(task.id, { completed: true });

  assert.equal(updated.completed, true);
});

test("returns null when updating a missing task", () => {
  assert.equal(updateTask(-1, { completed: true }), null);
});

test("deletes an existing task", () => {
  const task = createTask("Temporary task");

  assert.equal(deleteTask(task.id), true);
  assert.equal(deleteTask(task.id), false);
});