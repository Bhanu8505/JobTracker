import React from "react";
import { useAuth } from "../Utils/UseAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  // navigate("/");
  return (
    <div className="font-bold text-lg">
      <button className="cursor-pointer" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
