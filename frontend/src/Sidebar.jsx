import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-48 bg-gray-800 text-white flex flex-col py-8 px-4 fixed top-0 left-0">
      <div className="mb-8 text-2xl font-bold text-center">Task Manager</div>
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className={`py-2 px-3 rounded transition-colors ${isActive("/") ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          Dashboard
        </Link>
        <Link
          to="/tasks"
          className={`py-2 px-3 rounded transition-colors ${isActive("/tasks") ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          Completed tasks
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
