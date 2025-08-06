import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/UseAuth.js";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    console.log("Form submitted");

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-300 ">
      <div
        className={`w-1/2 flex justify-center items-center text-gray-700 transform transition-all duration-700 ease-in-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      >
        <div className="rounded-xl">
          <h1 className="mb-10 text-5xl font-bold">Welcome to Job Tracker</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-10 justify-center items-center"
          >
            <input
              type="email"
              placeholder="john@email.com"
              className="border-2 p-4 m-4 outline-none w-full rounded-lg text-lg"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 p-4 m-4 outline-none w-full rounded-lg text-lg"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="border-2 w-full m-2 py-3 px-1 outline-none rounded-lg text-lg font-bold">
              Login
            </button>
            <div className="font-medium">
              <Link to="/register">
                Don't have an account?{" "}
                <span className=" text-indigo-700">Register here</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 flex h-full pr-3">
        <div
          className={`flex justify-center items-center p-10 transform transition-all duration-700 ease-in-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <img
            className="object-cover rounded-lg"
            src="/public/LoginImage.png"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
