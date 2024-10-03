export const checkAlreadyExists = (tasks, newTask) => {
  return tasks.find((task) => task.title === newTask);
};
