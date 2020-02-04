import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TaskList, { filterTasks } from '@/views/TaskList.vue';

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

  describe('filterTasks', () => {
    const TASKS = [
      { id: 0, updatedAt: new Date('2015-01-01'), done: false },
      { id: 1, updatedAt: new Date('2015-01-02'), done: true },
      { id: 2, updatedAt: new Date('2015-01-03'), done: false },
      { id: 3, updatedAt: new Date('2015-01-04'), done: true },
      { id: 4, updatedAt: new Date('2015-01-05'), done: true },
      { id: 5, updatedAt: new Date('2015-01-06'), done: true },
      { id: 6, updatedAt: new Date('2015-01-07'), done: false },
      { id: 7, updatedAt: new Date('2015-01-08'), done: false },
      { id: 8, updatedAt: new Date('2015-01-09'), done: false },
      { id: 9, updatedAt: new Date('2015-01-10'), done: false },
    ];

    it('returns all tasks', () => {
      const filters = {
        range: [],
        done: false,
      };

      expect(filterTasks(TASKS, filters)).toEqual(TASKS);
    });

    it('returns only tasks marked done', () => {
      const filters = {
        range: [],
        done: true,
      };

      const EXPECT = [
        { id: 1, updatedAt: new Date('2015-01-02'), done: true },
        { id: 3, updatedAt: new Date('2015-01-04'), done: true },
        { id: 4, updatedAt: new Date('2015-01-05'), done: true },
        { id: 5, updatedAt: new Date('2015-01-06'), done: true },
      ];

      expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
    });

    it('returns only tasks that was updated starting from the DATE', () => {
      const filters = {
        range: [new Date('2015-01-07'), undefined],
        done: false,
      };

      const EXPECT = [
        { id: 6, updatedAt: new Date('2015-01-07'), done: false },
        { id: 7, updatedAt: new Date('2015-01-08'), done: false },
        { id: 8, updatedAt: new Date('2015-01-09'), done: false },
        { id: 9, updatedAt: new Date('2015-01-10'), done: false },
      ];

      expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
    });

    it('returns only tasks older than DATE', () => {
      const filters = {
        range: [undefined, new Date('2015-01-05')],
        done: false,
      };

      const EXPECT = [
        { id: 0, updatedAt: new Date('2015-01-01'), done: false },
        { id: 1, updatedAt: new Date('2015-01-02'), done: true },
        { id: 2, updatedAt: new Date('2015-01-03'), done: false },
        { id: 3, updatedAt: new Date('2015-01-04'), done: true },
        { id: 4, updatedAt: new Date('2015-01-05'), done: true },
      ];

      expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
    });
    it('returns only tasks within RANGE', () => {
      const filters = {
        range: [new Date('2015-01-02'), new Date('2015-01-05')],
        done: false,
      };

      const EXPECT = [
        { id: 1, updatedAt: new Date('2015-01-02'), done: true },
        { id: 2, updatedAt: new Date('2015-01-03'), done: false },
        { id: 3, updatedAt: new Date('2015-01-04'), done: true },
        { id: 4, updatedAt: new Date('2015-01-05'), done: true },
      ];

      expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
    });

    it('returns only tasks marked done and within RANGE', () => {
      const filters = {
        range: [new Date('2015-01-02'), new Date('2015-01-05')],
        done: true,
      };

      const EXPECT = [
        { id: 1, updatedAt: new Date('2015-01-02'), done: true },
        { id: 3, updatedAt: new Date('2015-01-04'), done: true },
        { id: 4, updatedAt: new Date('2015-01-05'), done: true },
      ];

      expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
    });
  });
});
