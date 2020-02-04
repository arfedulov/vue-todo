export const createTask = () => ({
  id: new Date().getTime(),
  title: '',
  content: '',
  done: false,
  updatedAt: new Date(),
});

export default createTask;
