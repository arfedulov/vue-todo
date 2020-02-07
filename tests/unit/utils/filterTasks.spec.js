import filterTasks from '@/utils/filterTasks';

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

  it('by default returns only tasks not done', () => {
    const filters = {
      range: [],
      done: false,
    };

    const EXPECT = [
      { id: 0, updatedAt: new Date('2015-01-01'), done: false },
      { id: 2, updatedAt: new Date('2015-01-03'), done: false },
      { id: 6, updatedAt: new Date('2015-01-07'), done: false },
      { id: 7, updatedAt: new Date('2015-01-08'), done: false },
      { id: 8, updatedAt: new Date('2015-01-09'), done: false },
      { id: 9, updatedAt: new Date('2015-01-10'), done: false },
    ];

    expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
  });

  it('returns all tasks', () => {
    const filters = {
      range: [],
      done: true,
    };

    expect(filterTasks(TASKS, filters)).toEqual(TASKS);
  });

  it('returns only tasks that was updated starting from the DATE and are not done', () => {
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

  it('returns only tasks older than DATE and are not done', () => {
    const filters = {
      range: [undefined, new Date('2015-01-05')],
      done: false,
    };

    const EXPECT = [
      { id: 0, updatedAt: new Date('2015-01-01'), done: false },
      { id: 2, updatedAt: new Date('2015-01-03'), done: false },
    ];

    expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
  });
  it('returns only tasks within RANGE and not done', () => {
    const filters = {
      range: [new Date('2015-01-02'), new Date('2015-01-05')],
      done: false,
    };

    const EXPECT = [
      { id: 2, updatedAt: new Date('2015-01-03'), done: false },
    ];

    expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
  });

  it('returns only tasks within RANGE including done', () => {
    const filters = {
      range: [new Date('2015-01-02'), new Date('2015-01-05')],
      done: true,
    };

    const EXPECT = [
      { id: 1, updatedAt: new Date('2015-01-02'), done: true },
      { id: 2, updatedAt: new Date('2015-01-03'), done: false },
      { id: 3, updatedAt: new Date('2015-01-04'), done: true },
      { id: 4, updatedAt: new Date('2015-01-05'), done: true },
    ];

    expect(filterTasks(TASKS, filters)).toEqual(EXPECT);
  });
});
