const isValidDate = date => date && !Number.isNaN(date.getTime());

const filterTasks = (tasks, filters) => {
  const { range, done: includeDoneAlso } = filters;
  const filtered = (tasks || []).filter((task) => {
    let result = includeDoneAlso ? true : !task.done;
    if (isValidDate(range[0])) {
      result = task.updatedAt >= range[0] && result;
    }
    if (isValidDate(range[1])) {
      result = task.updatedAt <= range[1] && result;
    }
    if (isValidDate(range[0]) && isValidDate(range[1])) {
      result = task.updatedAt >= range[0]
        && task.updatedAt <= range[1] && result;
    }
    return result;
  });

  return filtered;
};

export default filterTasks;
