import React, { useEffect, useState } from "react";
import homeIcon from "../assets/home.svg";
import deleteIcon from "../assets/delete.svg";
import outDoor from "../assets/out.svg";
import axios from "axios";
import ViewTaskPopup from "./ViewTaskPopup";

const TaskCard = ({ task }) => {
  const [PopupCard, setPopupCard] = useState(false);
  const [date, setDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false); // Track state
  useEffect(() => {
    const rawDate = new Date(task.createdAt);
    const formattedDate = rawDate.toLocaleDateString("en-GB");
    setDate(formattedDate);

    if (task.completed) return setIsCompleted(true);
  }, [task]);



  const handleCompleteClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/tasks/updateComplte/${task._id}`,
        {},
        { withCredentials: true }
      );
      console.log(response);
      setIsCompleted((prev) => !prev);
    } catch (error) {
      console.log("Update completed error:", error);
    }
  };

  return (
    <div
      className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 w-full min-w-[240px]"
      onClick={() => setPopupCard(true)}
    >
      {/* Checkbox */}
      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-gray-600"
          checked={isCompleted}
          onChange={handleCompleteClick}
        />
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-[150px]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-black font-medium text-sm sm:text-base ${isCompleted ? "line-through" : ""}`}>
            {task?.title || "No title"}
          </span>
          {task.isOutdoor ? (
            <img src={homeIcon} alt="Outdoor" className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <img src={outDoor} alt="Indoor" className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>

        {/* Priority and Date */}
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {task.priority == "High" && (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-0.5 rounded">
              High
            </span>
          )}
          {task.priority == "Low" && (
            <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-2.5 py-0.5 rounded">
              Low
            </span>
          )}
          {task.priority == "Medium" && (
            <span className="bg-green-100 text-green-600 text-xs font-semibold px-2.5 py-0.5 rounded">
              Medium
            </span>
          )}
          <span className="text-gray-500 text-xs sm:text-sm">{date}</span>
        </div>
      </div>
      {PopupCard && <ViewTaskPopup task={task} onClose={()=>setPopupCard(false)}/>}
      {/* Delete Icon */}
      <div className="flex-shrink-0 flex items-center">
        <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
    
  );
};

export default TaskCard;
