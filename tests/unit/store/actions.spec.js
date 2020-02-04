import { actions } from '@/store';

describe('store:actions:syncTasks()', () => {
  const TASKS = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
  ];
  let context;
  let getTasks;
  let commit;
  let api;

  describe('store is not fresh (api has some updates)', () => {
    beforeEach(() => {
      getTasks = jest.fn(() => Promise.resolve([...TASKS]));
      commit = jest.fn();
      api = {
        isFresh: () => false,
        getTasks,
      };
      context = {
        commit,
      };
    });

    it('calls api.getTasks and commits `loadTasks` mutation with TASKS array as a payload', async () => {
      await actions.syncTasks.call({ $api: api }, context);

      expect(getTasks).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('loadTasks', TASKS);
    });
  });

  describe('store is fresh (api does not have any updates)', () => {
    beforeEach(() => {
      getTasks = jest.fn(() => Promise.resolve([...TASKS]));
      commit = jest.fn();
      api = {
        isFresh: () => true,
        getTasks,
      };
      context = {
        commit,
      };
    });

    it('doesnt call api.getTasks', async () => {
      await actions.syncTasks.call({ $api: api }, context);

      expect(getTasks).not.toHaveBeenCalled();
    });
  });
});

describe('store:actions:createTask()', () => {
  let context;
  let createTask;
  let commit;
  let api;

  describe('api successfuly creates task', () => {
    beforeEach(() => {
      createTask = jest.fn(() => Promise.resolve(true));
      commit = jest.fn();
      api = {
        createTask,
      };
      context = {
        commit,
      };
    });

    it('calls api.create task and commits `createTask` mutation with TASK as a payload', async () => {
      const TASK = { id: 123 };
      await actions.createTask.call({ $api: api }, context, TASK);

      expect(createTask).toHaveBeenCalledTimes(1);
      expect(createTask).toHaveBeenCalledWith(TASK);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('createTask', TASK);
    });
  });

  describe('api returns failure response', () => {
    beforeEach(() => {
      createTask = jest.fn(() => Promise.resolve(false));
      commit = jest.fn();
      api = {
        createTask,
      };
      context = {
        commit,
      };
    });

    it('calls api.create task and doesnt commit `createTask` mutation', async () => {
      const TASK = { id: 123 };
      await actions.createTask.call({ $api: api }, context, TASK);

      expect(createTask).toHaveBeenCalledTimes(1);
      expect(createTask).toHaveBeenCalledWith(TASK);
      expect(commit).not.toHaveBeenCalled();
    });
  });
});

describe('store:actions:deleteTask()', () => {
  let context;
  let deleteTask;
  let commit;
  let api;

  describe('api returns success status', () => {
    beforeEach(() => {
      deleteTask = jest.fn(() => Promise.resolve(true));
      commit = jest.fn();
      api = {
        deleteTask,
      };
      context = {
        commit,
      };
    });

    it('calls api.deleteTask and commits `deleteTask` mutation with ID as a payload', async () => {
      const ID = 12345;
      await actions.deleteTask.call({ $api: api }, context, ID);

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
      api = {
        deleteTask,
      };
      context = {
        commit,
      };
    });

    it('calls api.deleteTask with ID and doesnt commit `deleteTask` mutation', async () => {
      const ID = 124949;
      await actions.deleteTask.call({ $api: api }, context, ID);

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
  let api;

  describe('api returns success status', () => {
    beforeEach(() => {
      updateTask = jest.fn(() => Promise.resolve(true));
      commit = jest.fn();
      api = {
        updateTask,
      };
      context = {
        commit,
      };
    });

    it('it calls api.updateTask with TASK and commits `updateTask` mutation with TASK as a payload', async () => {
      const TASK = { id: 3434 };
      await actions.updateTask.call({ $api: api }, context, TASK);

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
      api = {
        updateTask,
      };
      context = {
        commit,
      };
    });

    it('calls api.updateTask with TASK and doesnt commit `deleteTask` mutation', async () => {
      const TASK = { id: 12345 };
      await actions.updateTask.call({ $api: api }, context, TASK);

      expect(updateTask).toHaveBeenCalledTimes(1);
      expect(updateTask).toHaveBeenCalledWith(TASK);
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
