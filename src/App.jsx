import React, { useEffect, useState } from "react";
import Heeder from "./components/Header/Heeder";
import Todo from "./components/todos/Todo";

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") ?? "false")
  );

  const changeTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.querySelector('body').classList.add("dark-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.querySelector('body').classList.remove("dark-mode");
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", newDarkMode);
  };
  useEffect(() => {
    if (darkMode) {
      document.querySelector('body').classList.add("dark-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.querySelector('body').classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <>
      <div className="bg-[--bgColor]">
        <Heeder darkMode={darkMode} />
        <Todo changeTheme={changeTheme} darkMode={darkMode} />
      </div>
    </>
  );
}

export default App;
