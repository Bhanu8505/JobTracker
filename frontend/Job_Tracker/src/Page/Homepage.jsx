import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/UseAuth";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import JobBoard from "./JobBoard";

const Homepage = () => {
  const { jobs, getAllJobsForUser, logout } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllJobsForUser();
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  console.log("Jobs in HomePage : ", jobs);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="h-[50px] flex-shrink-0">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-[70px] flex-shrink-0" />
        <JobBoard className="flex-1 overflow-x-auto overflow-y-hidden" />
      </div>
    </div>
  );
};

export default Homepage;
