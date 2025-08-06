import React from "react";
import Header from "./Header";
import Jobs from "./Jobs";
import Navbar from "./Navbar";

const Dashboard = ({ data }) => {
  console.log("Dashboard Data : ", data);
  return (
    <div className="w-full h-full flex justify-center items-center text-gray-700">
      <div className="border-2 rounded-xl overflow-hidden">
        <div className="sticky top-0 z-10">
          <Header data={data} />
        </div>

        <div className="h-[70vh] overflow-y-auto" id="joblist">
          <Jobs data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
