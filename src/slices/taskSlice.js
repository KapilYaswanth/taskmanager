import { createSlice } from "@reduxjs/toolkit";

const loadTask = (username) => {
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTask = (username, tasks) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    username: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
      state.tasks = loadTask(action.payload);
    },
    logoutUser: (state) => {
      state.username = null;
      localStorage.removeItem("user");
    },
    addTask: (state, action) => {
      const newTask = { id: Date.now(), ...action.payload, completed: false };
      state.tasks.push(newTask);
      saveTask(state.username, state.tasks);
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      state.tasks.find((task) => task.id === id).title = title;
      saveTask(state.username, state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTask(state.username, state.tasks);
    },
    toggleCompleteTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      task.completed = !task.completed;
      saveTask(state.username, state.tasks);
    },
  },
});

export const {
  setUser,
  addTask,
  editTask,
  deleteTask,
  toggleCompleteTask,
  logoutUser,
} = taskSlice.actions;

export default taskSlice.reducer;
