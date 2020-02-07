import { logger } from './logger';
import { createTask, parseTask } from './createTask';

const error = logger('error');
const ITEM_KEY = 'tasks';

let isFresh = false;

export const api = {
  getTasks: () => {
    try {
      const tasks = (JSON.parse(localStorage.getItem(ITEM_KEY)) || [])
        .map(parseTask);
      isFresh = true;
      return tasks;
    } catch (err) {
      error(err);
      return false;
    }
  },
  createTask: () => {
    try {
      const tasks = (JSON.parse(localStorage.getItem(ITEM_KEY)) || [])
        .map(parseTask);
      const task = createTask();
      tasks.push(task);
      localStorage.setItem(ITEM_KEY, JSON.stringify(tasks));
      isFresh = false;
      return task;
    } catch (err) {
      error(err);
      return false;
    }
  },
  deleteTask: (id) => {
    try {
      const tasks = (JSON.parse(localStorage.getItem(ITEM_KEY)) || [])
        .map(parseTask);
      localStorage.setItem(ITEM_KEY, JSON.stringify(tasks.filter(t => t.id !== id)));
      isFresh = false;
      return true;
    } catch (err) {
      error(err);
      return false;
    }
  },
  updateTask: (task) => {
    try {
      const tasks = (JSON.parse(localStorage.getItem(ITEM_KEY)) || [])
        .map(parseTask);
      localStorage.setItem(ITEM_KEY, JSON.stringify(tasks.reduce((acc, t) => {
        if (t.id === task.id) {
          acc.push({ ...t, ...task });
        } else {
          acc.push(t);
        }
        return acc;
      }, [])));
      isFresh = false;
      return true;
    } catch (err) {
      error(err);
      return false;
    }
  },
  isFresh: () => isFresh,
};

export default api;
