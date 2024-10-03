import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  toggleCompleteTask,
} from "./slices/taskSlice";
import "./styles.css";
import { checkAlreadyExists } from "./utilityFunction";

const TaskManagement = ({ handleLogout }) => {
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFilterValue === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
      return;
    }
    if (selectedFilterValue === "incomplete") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
      return;
    }
    setFilteredTasks(tasks);
  }, [selectedFilterValue, JSON.stringify(tasks)]);

  const handleFilterChange = (event) => {
    setSelectedFilterValue(event.target.value);
  };

  const handleAddTask = () => {
    if (checkAlreadyExists(tasks, newTask)) {
      alert("task already exists");
      return;
    }
    if (newTask) {
      dispatch(addTask({ title: newTask }));
      setNewTask("");
    }
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
    const task = tasks.find((task) => task.id === id);
    setEditTitle(task.title);
  };

  const handleSaveEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!editTitle) {
      alert("task name should not be empty");
      return;
    }
    console.log('sss', editTitle, task.title)
    if (checkAlreadyExists(tasks, editTitle) && editTitle !== task.title) {
      alert("task already exists");
      return;
    }
    dispatch(editTask({ id, title: editTitle }));
    setEditingTaskId(null);
    setEditTitle("");
  };

  return (
    <>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add task"
      />
      <button style={{ marginLeft: "10px" }} onClick={handleAddTask}>
        Add Task
      </button>
      <br />
      <div style={{ marginTop: "10px" }}>
        <select
          id="dropdown"
          value={selectedFilterValue}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <li key={task.id} style={{ listStyle: "none" }}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button
                    className="loginField"
                    onClick={() => handleSaveEdit(task.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      margin: "0px 10px",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </span>
                  <button
                    className="loginField"
                    onClick={() => handleEditTask(task.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="loginField"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Delete
                  </button>
                  <button onClick={() => dispatch(toggleCompleteTask(task.id))}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default TaskManagement;
