import React from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Utils/UseAuth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMenu);

    return () => document.removeEventListener("mousedown", handleMenu);
  }, []);

  // const logoutHandler = () => {
  //   logout;
  //   navigate("/");
  // };

  // navigate("/");
  // return (
  //   <div className="font-bold text-lg">
  //     <button className="cursor-pointer" onClick={logout}>
  //       Logout
  //     </button>
  //   </div>
  // );

  return (
    <div ref={menuRef} className=" relative text-lg ">
      <button onClick={() => setOpen(!open)} className={`w-full h-full `}>
        <img
          src={authUser.avatar.url}
          alt="profile"
          className="w-full h-full object-cover p-1"
        />
      </button>
      {open && (
        <div
          className={`flex flex-col gap-4 justify-between absolute right-0 z-50 border-gray-200 rounded-lg bg-white shadow-lg mt-2 px-1 py-3 w-40 max-h-50 overflow-y-auto jobpage `}
        >
          <Link
            className="text-center w-full p-2 rounded-md cursor-pointer hover:bg-gray-200"
            to="/resume"
          >
            Resume
          </Link>
          <Link
            className="text-center w-full p-2 rounded-md cursor-pointer hover:bg-gray-200"
            to="/me"
          >
            Profile
          </Link>
          <button
            className="w-full cursor-pointer p-2 rounded-md hover:bg-gray-200"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
