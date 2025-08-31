import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

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
    setLoader(true);
    const res = await signUp(formData);
    setLoader(false);
    console.log("Sign up request sent");
    if (res.success) {
      navigate("/login");
    } else {
      console.log("Error Signing Up : ", res.message || "Something Went Wrong");
    }
  };
  return (
    <div className="h-screen w-screen flex bg-gray-200">
      <div
        className={`w-1/2 h-full flex justify-center items-center pr-15 transform transition-all duration-700 ease-in-out ${
          loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <img
          className="object-cover h-full w-full rounded-r-lg"
          src="/public/RegisterImage.png"
        />
      </div>

      <div className="w-1/2">
        <div
          className={`flex justify-center items-center flex-col w-full h-full transform transition-all duration-700 ease-in-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <h1 className="m-4 text-5xl font-bold">Join Job Tracker</h1>
          <form
            className="flex shadow-lg bg-gray-300 flex-col gap-4 p-15 rounded-md"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-4">
              <label htmlFor="email" className="text-xl w-32 text-left">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                id="email"
                className="border-2 rounded-md p-1.5"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="username" className="text-xl w-32 text-left">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={handleChange}
                name="username"
                id="username"
                className="border-2 rounded-md p-1.5"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="password" className="text-xl w-32 text-left">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                id="password"
                className="border-2 rounded-md p-1.5"
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="fullName" className="text-xl w-32 text-left">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                name="fullName"
                id="fullName"
                className="border-2 rounded-md p-1.5"
              />
            </div>
            <div className="flex justify-center items-center mt-5">
              <button
                disabled={loader}
                className=" px-5 py-1 border-2 rounded-md"
              >
                Submit
                {/* {loader ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )} */}
              </button>
            </div>
            <div className="flex justify-center w-full">
              <span className="cursor-pointer">
                Already have an account?{" "}
                <Link to="/" className=" text-md underline text-indigo-700">
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      {loader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
