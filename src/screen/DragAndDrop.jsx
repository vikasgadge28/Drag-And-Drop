/** @format */

import React, { useState, useRef } from "react";
import "../../src/App.css";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState(["Design UI", "Write Code", "Test App", "Deploy"]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null); // Track the index of the dragged item
  const taskContainerRef = useRef(null);

  const handleDragStart = (event, index) => {
    setDraggedItem(tasks[index]);
    setDraggingIndex(index);
    event.currentTarget.classList.add("opacity-50", "scale-105");
  };

  const handleTouchStart = (index) => {
    setDraggedItem(tasks[index]);
    setDraggingIndex(index);
  };

  const handleDragEnd = (event) => {
    event.currentTarget.classList.remove("opacity-50", "scale-105");
    setDraggingIndex(null);
    setDraggedItem(null);
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    reorderTasks(targetIndex);
  };

  const handleTouchEnd = (targetIndex) => {
    reorderTasks(targetIndex);
  };

  const handleDragOver = (event, targetIndex) => {
    event.preventDefault();

    // Highlight the drop area
    const target = event.currentTarget;
    target.classList.add("scale-105", "bg-gray-600");
    setTimeout(() => target.classList.remove("scale-105", "bg-gray-600"), 200);
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
        <div
          ref={taskContainerRef}
          className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 transition-all duration-300 w-full space-y-3"
        >
          {tasks.map((task, index) => (
            <div
              key={task}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnd={handleDragEnd}
              onDrop={(event) => handleDrop(event, index)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={() => handleTouchEnd(index)}
              onDragOver={(event) => handleDragOver(event, index)}
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
