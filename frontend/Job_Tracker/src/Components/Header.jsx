import React from "react";
import Navbar from "./Navbar";

const Header1 = () => {
  return (
    <div className="h-full w-full flex justify-between px-4 bg-blue-900">
      <h2 className="text-2xl text-white h-full font-bold flex justify-center items-center">
        Job Tracker
      </h2>

      <Navbar />
    </div>
  );
};

export default Header1;
