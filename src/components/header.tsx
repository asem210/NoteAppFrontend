import React from 'react';

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <header className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold">Notes App</h1>
      <nav>
        <button
          className="mx-2 px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition duration-300"
          onClick={onLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
