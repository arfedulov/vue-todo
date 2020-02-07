import Vue from 'vue';
import Vuex from 'vuex';
import { logger } from '../logger';
import API from '../localStorageApi';

const info = logger('info');
const error = logger('error');

Vue.use(Vuex);

export const mutations = {
  createTask(state, task) {
    if (state.tasks.some(t => t.id === task.id)) {
      throw new Error(`Task with id ${task.id} already exist`);
    }
    state.tasks.push(task);
  },
  updateTask(state, task) {
    const taskIndex = state.tasks.findIndex(t => t.id === task.id);
    if (taskIndex === -1) {
      throw new Error(`Task with id ${task.id} does not exist`);
    }
    Vue.set(state.tasks, taskIndex, { ...state.tasks[taskIndex], ...task });
  },
  deleteTask(state, id) {
    state.tasks = state.tasks.filter(t => t.id !== id);
  },
  loadTasks(state, tasks) {
    state.tasks = tasks;
  },
};

export const actions = {
  async syncTasks({ commit }) {
    info('sync tasks starting...');
    try {
      if (!await API.isFresh()) {
        const tasks = await API.getTasks();
        commit('loadTasks', tasks);
      }
      info('sync tasks end successfuly');
    } catch (err) {
      error(err);
    }
  },
  async createTask({ commit }) {
    info('create task starting...');
    try {
      const task = await API.createTask();
      if (task) {
        commit('createTask', task);
        info(`create task ${task.id} end successfuly`);
      }
    } catch (err) {
      error(err);
    }
  },
  async deleteTask({ commit }, id) {
    info(`delete task ${id} starting...`);
    try {
      if (await API.deleteTask(id)) {
        commit('deleteTask', id);
        info(`delete task ${id} end successfuly`);
      }
    } catch (err) {
      error(err);
    }
  },
  async updateTask({ commit }, task) {
    info(`update task ${task.id} starting...`);
    try {
      if (await API.updateTask(task)) {
        commit('updateTask', task);
        info(`update task ${task.id} end successfuly`);
      }
    } catch (err) {
      error(err);
    }
  },
};

const store = new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations,
  actions,
  modules: {
  },
});

export default store;
