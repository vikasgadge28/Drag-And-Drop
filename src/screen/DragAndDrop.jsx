/** @format */

import React, { useState, useRef } from "react";
import "../../src/App.css";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState(["Design UI", "Write Code", "Test App", "Deploy"]);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null); 
  const taskRefs = useRef([]); 


  const handleDragStart = (event, index) => {
    setDraggedTaskIndex(index);
    event.dataTransfer.effectAllowed = "move"; 
    event.dataTransfer.setData("text/plain", ""); 
    event.currentTarget.classList.add("opacity-50");
  };


  const handleDragEnd = (event) => {
    event.currentTarget.classList.remove("opacity-50");
    setDraggedTaskIndex(null);
  };

 
  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    reorderTasks(draggedTaskIndex, targetIndex);
  };

  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  
  const handleTouchStart = (index) => {
    setDraggedTaskIndex(index);
    taskRefs.current[index].classList.add("opacity-50");
  };

 
  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const taskContainer = taskRefs.current[0]?.parentNode;

    if (taskContainer) {
      const rect = taskContainer.getBoundingClientRect();
      const yOffset = touch.clientY - rect.top;

      const taskHeight = taskRefs.current[0]?.offsetHeight || 0;
      const targetIndex = Math.floor(yOffset / taskHeight);

      if (targetIndex >= 0 && targetIndex < tasks.length && targetIndex !== draggedTaskIndex) {
        reorderTasks(draggedTaskIndex, targetIndex);
        setDraggedTaskIndex(targetIndex);
      }
    }
  };

  
  const handleTouchEnd = () => {
    taskRefs.current[draggedTaskIndex]?.classList.remove("opacity-50");
    setDraggedTaskIndex(null);
  };

  
  const reorderTasks = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">
          Task Organizer
        </h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 w-full space-y-3">
          {tasks.map((task, index) => (
            <div
              key={task}
              ref={(el) => (taskRefs.current[index] = el)} // Assign refs to each task
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnd={handleDragEnd}
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={handleDragOver}
              onTouchStart={() => handleTouchStart(index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg px-4 py-3 shadow-md cursor-grab transition-transform duration-200 transform ${
                draggedTaskIndex === index ? "opacity-50" : "hover:scale-105"
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
