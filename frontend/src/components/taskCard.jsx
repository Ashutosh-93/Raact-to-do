import React, { useState } from "react";

const TaskCard = ({ task }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Task Title */}
      <h3 className="text-lg font-semibold">{task.title}</h3>

      {/* Priority */}
      <p className="text-sm text-gray-500">Priority: {task.priority}</p>

      {/* Completed Tick */}
      <p className={`text-sm font-semibold ${task.completed ? "text-green-600" : "text-red-500"}`}>
        {task.completed ? "✔ Completed" : "✖ Not Completed"}
      </p>

      {/* Expanded Section (only shows when expanded) */}
      {expanded && (
        <div className="mt-2 border-t pt-2">
          <p className="text-sm text-gray-700">{task.description || "No description available."}</p>
          <p className="text-sm">{task.isOutdoor ? "🌿 Outdoor Task" : "🏠 Indoor Task"}</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
