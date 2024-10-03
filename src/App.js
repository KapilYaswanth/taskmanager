import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser } from "./slices/taskSlice";
import Login from "./Login";
import TaskManagement from "./TaskManagement";

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.tasks.username);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    dispatch(setUser(username));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="App">
      {isLoggedIn ? (
        <TaskManagement handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}
