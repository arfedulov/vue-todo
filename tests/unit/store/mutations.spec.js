import { mutations } from '@/store';

describe('store:mutations:loadTasks()', () => {
  it('assigns provided TASKS value to `tasks` property', () => {
    const state = { tasks: [] };
    const TASKS = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    mutations.loadTasks(state, TASKS);

    const EXPECT_STATE = { tasks: TASKS };

    expect(state).toEqual(EXPECT_STATE);
  });
});

describe('store:mutations:createTask()', () => {
  it('inserts provided task into `tasks` array', () => {
    const state = {
      tasks: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    };
    const TASK = { id: 10 };
    const EXPECT_LENGTH = state.tasks.length + 1;

    mutations.createTask(state, TASK);

    expect(state.tasks).toContainEqual(TASK);
    expect(state.tasks).toHaveLength(EXPECT_LENGTH);
  });

  it('throws if task already exist', () => {
    const state = {
      tasks: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    };
    const TASK = { id: 2 };

    expect(() => mutations.createTask(state, TASK)).toThrow();
  });
});

describe('store:mutations:deleteTask()', () => {
  it('removes task from `tasks` array', () => {
    const state = {
      tasks: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    };
    const ID = 2;
    const EXPECT_LENGTH = state.tasks.length - 1;

    mutations.deleteTask(state, ID);

    expect(state.tasks).not.toContainEqual({ id: ID });
    expect(state.tasks).toHaveLength(EXPECT_LENGTH);
  });
});

describe('store:mutations:updateTask()', () => {
  it('updates task if exist', () => {
    const PREV_TASK = { id: 1, title: 'c' };
    const state = {
      tasks: [
        { id: 0, title: 'a' },
        PREV_TASK,
        { id: 2, title: 'c' },
        { id: 3, title: 'd' },
      ],
    };
    const ID = PREV_TASK.id;
    const TASK = { id: ID, title: 'qwer' };
    const EXPECT_LENGTH = state.tasks.length;

    mutations.updateTask(state, TASK);

    expect(state.tasks).toContainEqual(TASK);
    expect(state.tasks).not.toContainEqual(PREV_TASK);
    expect(state.tasks).toHaveLength(EXPECT_LENGTH);
  });

  it('throws if task does not exist', () => {
    const state = {
      tasks: [
        { id: 0, title: 'a' },
        { id: 2, title: 'c' },
        { id: 3, title: 'd' },
      ],
    };
    const TASK = { id: 1, title: 'asdsad' };

    expect(() => mutations.updateTask(state, TASK)).toThrow();
  });
});
