/** @format */

import React, { useState, useRef } from "react";
import "../../src/App.css";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState(["Design UI", "Write Code", "Test App", "Deploy"]);
  const [draggedItem, setDraggedItem] = useState(null);
  const taskContainerRef = useRef(null);

  const handleDragStart = (event, item) => {
    setDraggedItem(item);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetItem) => {
    event.preventDefault();

    if (draggedItem !== targetItem) {
      const updatedTasks = [...tasks];
      const draggedIndex = updatedTasks.indexOf(draggedItem);
      const targetIndex = updatedTasks.indexOf(targetItem);

      // Rearrange the tasks
      updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(targetIndex, 0, draggedItem);

      setTasks(updatedTasks);
    }

    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">Task Organizer</h2>
        <div
          ref={taskContainerRef}
          className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 transition-all duration-300 w-full"
          onDragOver={handleDragOver}
        >
          {tasks.map((task) => (
            <div
              key={task}
              draggable
              onDragStart={(event) => handleDragStart(event, task)}
              onDrop={(event) => handleDrop(event, task)}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg px-4 py-3 mb-2 shadow-md cursor-grab transition-transform duration-300 transform hover:scale-105 active:scale-95"
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
