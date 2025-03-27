import React from "react";

const ViewTaskPopup = ({ task, onClose }) => {
    
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 sm:p-6 rounded-2xl w-full max-w-md shadow-xl transition-all duration-300 flex flex-col space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-lg sm:text-xl font-semibold leading-tight">{task.title}</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="bg-green-500 text-white text-xs sm:text-sm py-1 px-3 rounded-2xl shadow-sm">
              {task.isComplete ? "Completed" : "Not Completed"}
            </div>
            <div className="bg-yellow-500 text-white text-xs sm:text-sm py-1 px-3 rounded-2xl shadow-sm">
              {task.priority}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
          <p className="text-justify">{task.description}</p>
        </div>

        {/* Outdoor Disclaimer */}
        <div className="px-3 py-4 border border-red-300 rounded-md bg-red-100 space-y-2 shadow-inner">
          <div className="flex items-center gap-3 text-sm sm:text-base">
            <span>14<sup>°</sup>C</span>
            <span className="text-blue-700 border-2 rounded-b-sm px-1">Cloudy</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-red-700">
            It's dangerous to do this task because the weather is cloudy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskPopup;
