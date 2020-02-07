import { actions } from '@/store';
import MOCK_API from '@/localStorageApi';

jest.mock('@/localStorageApi', () => ({}));

describe('store:actions:syncTasks()', () => {
  const TASKS = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
  ];
  let context;
  let getTasks;
  let commit;

  describe('store is not fresh (api has some updates)', () => {
    beforeEach(() => {
      getTasks = jest.fn(() => Promise.resolve([...TASKS]));
      commit = jest.fn();

      MOCK_API.isFresh = () => false;
      MOCK_API.getTasks = getTasks;
      MOCK_API.TASKS = TASKS;

      context = {
        commit,
      };
    });

    it('calls api.getTasks and commits `loadTasks` mutation with TASKS array as a payload', async () => {
      await actions.syncTasks(context);

      expect(getTasks).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('loadTasks', MOCK_API.TASKS);
    });
  });

  describe('store is fresh (api does not have any updates)', () => {
    beforeEach(() => {
      getTasks = jest.fn(() => Promise.resolve([...TASKS]));
      commit = jest.fn();

      MOCK_API.isFresh = () => true;
      MOCK_API.getTasks = getTasks;
      MOCK_API.TASKS = TASKS;

      context = {
        commit,
      };
    });

    it('doesnt call api.getTasks', async () => {
      await actions.syncTasks(context);

      expect(getTasks).not.toHaveBeenCalled();
    });
  });
});

describe('store:actions:createTask()', () => {
  let context;
  let createTask;
  let commit;

  describe('api successfuly creates task', () => {
    const TASK = { id: 0 };
    beforeEach(() => {
      createTask = jest.fn(() => Promise.resolve(TASK));
      commit = jest.fn();

      MOCK_API.createTask = createTask;
      MOCK_API.TASK = TASK;

      context = {
        commit,
      };
    });

    it('calls api.create task and commits `createTask` mutation with TASK as a payload', async () => {
      await actions.createTask(context);

      expect(createTask).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('createTask', TASK);
    });
  });

  describe('api returns failure response', () => {
    beforeEach(() => {
      createTask = jest.fn(() => Promise.resolve(false));
      commit = jest.fn();

      MOCK_API.createTask = createTask;

      context = {
        commit,
      };
    });

    it('calls api.create task and doesnt commit `createTask` mutation', async () => {
      const TASK = { id: 123 };
      await actions.createTask(context, TASK);

      expect(createTask).toHaveBeenCalledTimes(1);
      expect(commit).not.toHaveBeenCalled();
    });
  });
});

describe('store:actions:deleteTask()', () => {
  let context;
  let deleteTask;
  let commit;

  describe('api returns success status', () => {
    beforeEach(() => {
      deleteTask = jest.fn(() => Promise.resolve(true));
      commit = jest.fn();

      MOCK_API.deleteTask = deleteTask;

      context = {
        commit,
      };
    });

    it('calls api.deleteTask and commits `deleteTask` mutation with ID as a payload', async () => {
      const ID = 12345;
      await actions.deleteTask(context, ID);

      expect(deleteTask).toHaveBeenCalledTimes(1);
      expect(deleteTask).toHaveBeenCalledWith(ID);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('deleteTask', ID);
    });
  });

  describe('api returns failure status', () => {
    beforeEach(() => {
      deleteTask = jest.fn(() => Promise.resolve(false));
      commit = jest.fn();

      MOCK_API.deleteTask = deleteTask;

      context = {
        commit,
      };
    });

    it('calls api.deleteTask with ID and doesnt commit `deleteTask` mutation', async () => {
      const ID = 124949;
      await actions.deleteTask(context, ID);

      expect(deleteTask).toHaveBeenCalledTimes(1);
      expect(deleteTask).toHaveBeenCalledWith(ID);
      expect(commit).not.toHaveBeenCalled();
    });
  });
});

describe('store:actions:updateTask()', () => {
  let context;
  let updateTask;
  let commit;

  describe('api returns success status', () => {
    beforeEach(() => {
      updateTask = jest.fn(() => Promise.resolve(true));
      commit = jest.fn();

      MOCK_API.updateTask = updateTask;

      context = {
        commit,
      };
    });

    it('it calls api.updateTask with TASK and commits `updateTask` mutation with TASK as a payload', async () => {
      const TASK = { id: 3434 };
      await actions.updateTask(context, TASK);

      expect(updateTask).toHaveBeenCalledTimes(1);
      expect(updateTask).toHaveBeenCalledWith(TASK);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('updateTask', TASK);
    });
  });

  describe('api returns failure status', () => {
    beforeEach(() => {
      updateTask = jest.fn(() => Promise.resolve(false));
      commit = jest.fn();

      MOCK_API.updateTask = updateTask;

      context = {
        commit,
      };
    });

    it('calls api.updateTask with TASK and doesnt commit `deleteTask` mutation', async () => {
      const TASK = { id: 12345 };
      await actions.updateTask(context, TASK);

      expect(updateTask).toHaveBeenCalledTimes(1);
      expect(updateTask).toHaveBeenCalledWith(TASK);
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
