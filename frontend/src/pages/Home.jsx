import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTaskPopup from "../components/AddTaskPopup.jsx";
import useFetchTasks from "../hooks/useFetchTasks.js";

const Home = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks, loading, error } = useFetchTasks();
  const username = useSelector((state) => state.auth.user.username);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Task Manager</h1>
        <span className="text-md font-bold">Hi, {username}</span>
      </nav>

      <div className="p-4 w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">Priority: {task.priority}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${task.completed ? "text-green-500" : "text-gray-400"}`}>
                  {task.completed ? "✅" : "⬜"}
                </span>
                <button className="text-blue-600 underline text-sm">View</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Task Button */}
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white w-14 h-14 rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all"
        onClick={() => setShowAddTask(true)}
      >
        +
      </button>

      {showAddTask && <AddTaskPopup onClose={() => setShowAddTask(false)} />}
    </div>
  );
};

export default Home;
