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

test("rejects empty task titles", () => {
  assert.throws(() => createTask("   "), /non-empty string/);
});

test("trims whitespace from task titles", () => {
  const task = createTask("  Review code  ");
  assert.equal(task.title, "Review code");
});

test("rejects unsupported update fields", () => {
  const task = createTask("Safe task");

  assert.throws(
    () => updateTask(task.id, { admin: true }),
    /unsupported fields/
  );
});

test("rejects non-boolean completion values", () => {
  const task = createTask("Safe task");

  assert.throws(
    () => updateTask(task.id, { completed: "yes" }),
    /must be a boolean/
  );
});