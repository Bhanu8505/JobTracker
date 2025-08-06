import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="grid grid-cols-5 text-gray-800">
      <h2 className="m-2 p-2 font-bold text-xl">Company</h2>
      <h2 className="m-2 p-2 font-bold text-xl">Description</h2>
      <h2 className="m-2 p-2 font-bold text-xl">Location</h2>
      <h2 className="m-2 p-2 font-bold text-xl">Status</h2>
      <Link
        to="/add_job"
        className="cursor-pointer m-2 px-2 py-1 text-left border-2 w-fit rounded-md font-bold text-lg"
      >
        Add Job
      </Link>
    </div>
  );
};

export default Header;
