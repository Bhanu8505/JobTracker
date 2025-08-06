import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import { useAuth } from "../Utils/UseAuth";
import Navbar from "../Components/Navbar";

const Homepage = () => {
  const { jobs, getAllJobsForUser, logout } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllJobsForUser();
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  console.log("Jobs in HomePage : ", jobs);

  if (!jobs) {
    return <div>Loading jobs...</div>;
  }

  return (
    <div className="h-screen w-screen text-black bg-white">
      <div className="backdrop-blur-xl h-full w-full">
        {/* Navbar */}
        <div className="flex justify-end h-[10vh] p-2 back">
          <Navbar />
        </div>

        <div className=" h-[90vh] w-full flex overflow-hidden">
          {/* Dashboard */}
          <div
            className={`flex justify-center items-center w-2/3 m-2 transform transition-all duration-700 ease-out ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Dashboard data={jobs} />
          </div>

          {/* Image section */}
          <div
            className={`w-1/3 flex h-full transform transition-all duration-700 ease-out ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            } `}
          >
            <div className="flex justify-center items-center overflow-hidden p-10">
              <img
                className="object-cover h-full w-full max-h-[85vh] rounded-lg"
                src="/public/DashboardImage.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
