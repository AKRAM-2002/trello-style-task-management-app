'use client';
import React from 'react';
import { XCircleIcon, ClockIcon, FlagIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'store/taskSlice';

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(todo._id));
  };

  // Define colors and labels based on priority
  const priorityStyles = {
    Low: { color: 'bg-green-200 border-green-500', label: 'Low', icon: <FlagIcon className="h-4 w-4 text-green-600" /> },
    Medium: { color: 'bg-yellow-200 border-yellow-500', label: 'Medium', icon: <FlagIcon className="h-4 w-4 text-yellow-600" /> },
    Urgent: { color: 'bg-red-200 border-red-500', label: 'Urgent', icon: <FlagIcon className="h-4 w-4 text-red-600" /> },
  };

  const priority = priorityStyles[todo.priority];

  return (
    <div
      className={`relative rounded-lg border-l-8 p-4 space-y-2 drop-shadow-lg ${priority.color} bg-gradient-to-br from-white to-gray-100`}
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <div>
            <h3 className="font-bold text-gray-800">{todo.title}</h3>
            {todo.description && <p className="text-sm text-gray-700 mt-1">{todo.description}</p>}
          </div>
        </div>
        <button onClick={handleDelete} className="text-gray-400 hover:text-red-500">
          <XCircleIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-1 text-xs text-gray-700">
          <ClockIcon className="h-4 w-4 text-gray-500" />
          {todo.deadline && <span>Due: {new Date(todo.deadline).toLocaleDateString()}</span>}
        </div>
        <div className={`flex items-center space-x-1 text-xs font-semibold ${priority.color.replace('bg-', 'text-')} py-1 px-2 rounded-full`}>
          {priority.icon}
          <span>{priority.label}</span>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
