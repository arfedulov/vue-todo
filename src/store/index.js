import Vue from 'vue';
import Vuex from 'vuex';
import { logger } from '../logger';
import { api } from '../localStorageApi';

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
  async syncTasks(context) {
    info('sync tasks starting...');
    try {
      if (!await this.$api.isFresh()) {
        const tasks = await this.$api.getTasks();
        context.commit('loadTasks', tasks);
      }
      info('sync tasks end successfuly');
    } catch (err) {
      error(err);
    }
  },
  async createTask(context, task) {
    info(`create task ${task.id} starting...`);
    try {
      if (await this.$api.createTask(task)) {
        context.commit('createTask', task);
        info(`create task ${task.id} end successfuly`);
      }
    } catch (err) {
      error(err);
    }
  },
  async deleteTask(context, id) {
    info(`delete task ${id} starting...`);
    try {
      if (await this.$api.deleteTask(id)) {
        context.commit('deleteTask', id);
        info(`delete task ${id} end successfuly`);
      }
    } catch (err) {
      error(err);
    }
  },
  async updateTask(context, task) {
    info(`update task ${task.id} starting...`);
    try {
      if (await this.$api.updateTask(task)) {
        context.commit('updateTask', task);
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

store.$api = api;

export default store;
