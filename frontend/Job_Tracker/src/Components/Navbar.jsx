import React from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Utils/UseAuth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
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
      <button onClick={() => setOpen(!open)}>
        <img
          src={"https://placehold.co/60x40"}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </button>
      {open && (
        <div className="flex flex-col gap-4 justify-between absolute right-0 z-50 border-gray-200 rounded-lg bg-white shadow-lg mt-2 px-1 py-3 w-40 max-h-40 overflow-y-auto jobpage">
          <Link className="text-center w-full cursor-pointer" to="/resume">
            Resume
          </Link>
          <button className="w-full cursor-pointer" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
