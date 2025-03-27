import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/taskSlice";

const AddTaskPopup = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [loading, setLoading] = useState(false);
  const {tasks} = useSelector(store => store.tasks)
  const dispatch = useDispatch()
  

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Task title is required!");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/tasks/create", { title, description, priority, isOutdoor },{
        withCredentials:true,
      });
      console.log(response?.data);
      dispatch(setTasks([...tasks, response?.data]))
      onClose(); 

    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4"onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg animate-fadeIn" onClick={(e)=>e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-3">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-2 border rounded mb-2 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          className="w-full p-2 border rounded mb-2 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          className="w-full p-2 border rounded mb-3 focus:outline-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={isOutdoor}
            onChange={() => setIsOutdoor(!isOutdoor)}
          />
          Outdoor Task
        </label>
        <div className="flex justify-between">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPopup;