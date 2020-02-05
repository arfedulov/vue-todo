export const createTask = () => ({
  id: new Date().getTime(),
  title: '',
  content: '',
  done: false,
  updatedAt: new Date(),
});

export const parseTask = (task) => {
  return { ...task, updatedAt: new Date(task.updatedAt) };
};

export default createTask;
