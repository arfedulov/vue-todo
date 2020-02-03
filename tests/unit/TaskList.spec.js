import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TaskList from '@/views/TaskList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TaskList', () => {
  it('dispatch `syncTasks` action when created', () => {
    const store = new Vuex.Store({
      actions: {
        syncTasks: () => {},
      },
    });
    const dispatch = jest.spyOn(store, 'dispatch');

    shallowMount(TaskList, {
      store,
      localVue,
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('syncTasks');
  });

  it('loads tasks from storage', () => {
    const TASKS = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
    ];
    const store = new Vuex.Store({
      state: {
        tasks: [...TASKS],
      },
      actions: {
        syncTasks: () => {},
      },
    });

    const wrapper = shallowMount(TaskList, {
      store,
      localVue,
    });

    expect(wrapper.vm.tasks).toEqual(TASKS);
  });

  describe('deleteTask', () => {
    it('dispatch `deleteTask` action', () => {
      const store = new Vuex.Store({
        state: {
          tasks: [],
        },
        actions: {
          syncTasks: () => {},
          deleteTask: () => {},
        },
      });
      const ID = 1231;
      const dispatch = jest.spyOn(store, 'dispatch');
      const wrapper = shallowMount(TaskList, {
        store,
        localVue,
      });

      wrapper.vm.deleteTask(ID);

      expect(dispatch).toHaveBeenCalledWith('deleteTask', ID);
    });
  });

  describe('createTask', () => {
    it('dispatch `createTask` action', () => {
      const store = new Vuex.Store({
        state: {
          tasks: [],
        },
        actions: {
          syncTasks: () => {},
          createTask: () => {},
        },
      });
      const dispatch = jest.spyOn(store, 'dispatch');
      const wrapper = shallowMount(TaskList, {
        store,
        localVue,
      });

      wrapper.vm.createTask();

      expect(dispatch).toHaveBeenCalledWith('createTask');
    });
  });

  describe('updateTask', () => {
    it('dispatch `updateTask` action', () => {
      const store = new Vuex.Store({
        state: {
          tasks: [],
        },
        actions: {
          syncTasks: () => {},
          updateTask: () => {},
        },
      });
      const TASK = { id: 123, title: 'qwe' };
      const dispatch = jest.spyOn(store, 'dispatch');
      const wrapper = shallowMount(TaskList, {
        store,
        localVue,
      });

      wrapper.vm.updateTask(TASK);

      expect(dispatch).toHaveBeenCalledWith('updateTask', TASK);
    });
  });
});
