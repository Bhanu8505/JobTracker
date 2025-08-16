import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`h-full transform transition-all duration-700 ease-in-out ${
        collapsed ? "w-20 " : "w-64 "
      } flex flex-col bg-white shadow-xl`}
    >
      <nav className={`h-full flex flex-col flex-1 px-4 py-6 overflow-hidden`}>
        <div className="h-full flex flex-col gap-4">
          <Link
            to=""
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-lg"
          >
            {collapsed ? (
              <img src="./home.png" className="w-8 h-7" />
            ) : (
              <div className="flex gap-5 justify-center items-center">
                <img src="./home.png" className="w-8 h-8" />
                <p>Home</p>
              </div>
            )}
          </Link>
          <Link
            to=""
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-lg"
          >
            {collapsed ? (
              <img src="./layout.png" className="w-8 h-7" />
            ) : (
              <div className="flex gap-5 justify-center items-center">
                <img src="./layout.png" className="w-8 h-8" />
                <p>Job Tracker</p>
              </div>
            )}
          </Link>
          <Link
            to="/resume"
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-lg"
          >
            {collapsed ? (
              <img src="./resume.png" className="w-8 h-7" />
            ) : (
              <div className="flex gap-5 justify-center items-center">
                <img src="./resume.png" className="w-8 h-8" />
                <p>Resume</p>
              </div>
            )}
          </Link>
        </div>
        <div className=" flex justify-end">
          <img
            src={collapsed ? "./expand.png" : "./collapse.png"}
            className="w-6 h-4 object-cover cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
