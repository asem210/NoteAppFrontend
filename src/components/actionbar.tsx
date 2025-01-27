import React from 'react';

const ActionBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-300">
        + Create Note
      </button>
      <input
        type="text"
        placeholder="Search notes..."
        className="border border-gray-300 rounded px-4 py-2 w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
      />
    </div>
  );
};

export default ActionBar;
