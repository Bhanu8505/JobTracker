import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const ProfilePage = () => {
  const { authUser, editUser } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    avatarUrl: authUser.avatar.url || "",
    // email: authUser?.email || "",
    // username: authUser?.username || "",
  });

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editUser(formData);
    console.log("Edit request sent from Profile Page");
    if (res.success) {
      navigate(0);
    } else {
      console.log(res.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-300">
      {/* <div className=" w-full h-full"> */}
      <div className="h-[50px] flex-shrink-0">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-[70px] flex-shrink-0" />
        {/* <JobBoard className="flex-1 overflow-x-auto overflow-y-hidden" /> */}
        <div
          className={`flex flex-col justify-center items-center w-full h-[90vh] transform transition-all duration-700 ease-in-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col border-2 w-lg rounded-lg p-4"
          >
            <div className="flex justify-center items-center w-full">
              <img
                src={authUser.avatar.url}
                className="w-60 h-40 object-cover rounded-3xl"
              />
            </div>
            <div className="flex flex-col mt-5 w-full">
              <div className="flex gap-10 w-full justify-center items-center m-3">
                <label htmlFor="name" className=" min-w-28 text-lg">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  id="fullName"
                  name="fullName"
                  onChange={handleChange}
                  className="text-lg p-2 rounded-lg bg-gray-200 focus:border-2"
                />
              </div>
              <div className="flex gap-10 w-full justify-center items-center m-3">
                <label htmlFor="email" className="min-w-28 text-lg">
                  Email
                </label>
                <input
                  type="email"
                  value={authUser.email}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className="text-lg p-2 rounded-lg bg-gray-200 focus:border-2"
                />
              </div>
              <div className="flex gap-10 w-full justify-center items-center m-3">
                <label htmlFor="username" className="min-w-28 text-lg">
                  Username
                </label>
                <input
                  type="text"
                  value={authUser.username}
                  id="username"
                  name="username"
                  onChange={handleChange}
                  className="text-lg p-2 rounded-lg bg-gray-200 focus:border-2"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button className=" px-2 py-1 border-gray-200 bg-blue-900 shadow-lg text-white font-bold text-lg mt-2 rounded-lg w-fit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default ProfilePage;
