import { logger } from './logger';

const error = logger('error');

let isFresh = false;

export const api = {
  getTasks: async () => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      isFresh = true;
      return tasks;
    } catch (err) {
      error(err);
      return false;
    }
  },
  createTask: async (task) => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      isFresh = false;
      return true;
    } catch (err) {
      error(err);
      return false;
    }
  },
  deleteTask: async (id) => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      localStorage.setItem('tasks', JSON.stringify(tasks.filter(t => t.id !== id)));
      isFresh = false;
      return true;
    } catch (err) {
      error(err);
      return false;
    }
  },
  updateTask: async (task) => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      localStorage.setItem('tasks', JSON.stringify(tasks.reduce((acc, t) => {
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
  isFresh: async () => isFresh,
};

export default api;
