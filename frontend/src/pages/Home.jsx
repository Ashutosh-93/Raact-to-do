import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchTasks from "../hooks/useFetchTasks.js"

const Home = () => {
  

  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  
  

  const { tasks, loading, error } = useFetchTasks();

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log("Home component rendered, tasks:", tasks);

  const openModal = (task) => setSelectedTask(task);
  const closeModal = () => setSelectedTask(null);
  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-6 ${selectedTask ? "blur-sm" : ""}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Your Tasks</h2>

      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full max-w-6xl mx-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
            onClick={() => openModal(task)}
          >
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 animate-fadeIn" onClick={closeModal}>
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform scale-95 transition-all duration-200 ease-out animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">{selectedTask.title}</h2>
            <p className="text-gray-700">{selectedTask.description}</p>
            <p className="text-sm text-gray-500">Priority: {selectedTask.priority}</p>
            <p className="text-sm">{selectedTask.isOutdoor ? "Outdoor Task" : "Indoor Task"}</p>

            {/* Expand Button */}
            <Link
              to={`/task/${selectedTask.id}`}
              className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700 transition"
            >
              🔍 Expand
            </Link>

            <button
              onClick={closeModal}
              className="mt-3 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>


          
        </div>
      )}


<button
        className="fixed bottom-5 right-5 bg-blue-500 text-white w-14 h-14 rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all"
        onClick={() => setShowAddTask(true)}
      >
        +
      </button>

      {/* Add Task Modal */}
      {showAddTask && (
        <div
          className="fixed inset-0 bg-black opacity-50 flex items-center justify-center"
          onClick={() => setShowAddTask(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-80 shadow-lg animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-3">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Task Description"
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            <select className="w-full p-2 border rounded mb-3">
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={() => setShowAddTask(false)}
              >
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
