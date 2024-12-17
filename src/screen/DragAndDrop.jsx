/** @format */

import React, { useState, useRef } from "react";
import "../../src/App.css";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState(["Design UI", "Write Code", "Test App", "Deploy"]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (event, index) => {
    setDraggedItem(tasks[index]);
    setDraggingIndex(index);

    // Opera fallback for DataTransfer
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", tasks[index]);
      event.dataTransfer.effectAllowed = "move";
    }

    event.currentTarget.classList.add("opacity-50", "scale-105");
  };

  const handleDragEnd = (event) => {
    event.currentTarget.classList.remove("opacity-50", "scale-105");
    setDraggedItem(null);
    setDraggingIndex(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    return false; // Fallback for Opera
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    reorderTasks(targetIndex);
  };

  const reorderTasks = (targetIndex) => {
    const updatedTasks = [...tasks];
    const [removedTask] = updatedTasks.splice(draggingIndex, 1);
    updatedTasks.splice(targetIndex, 0, removedTask);

    setTasks(updatedTasks);
    setDraggedItem(null);
    setDraggingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">
       Task Organizer
        </h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 transition-all duration-300 w-full space-y-3">
          {tasks.map((task, index) => (
            <div
              key={task}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnd={handleDragEnd}
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={handleDragOver}
              className={`bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg px-4 py-3 shadow-md cursor-grab transition-transform duration-200 transform ${
                draggedItem === task ? "opacity-50 scale-105" : "hover:scale-105"
              }`}
            >
              {task}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
