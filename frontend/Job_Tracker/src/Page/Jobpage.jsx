import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/UseAuth";
import { Link, useParams } from "react-router-dom";
import Delete from "../Components/Delete";

const Jobpage = () => {
  const { jobs, getAllJobsForUser } = useAuth();
  const { jobId } = useParams();

  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const MAX_LENGTH = 150;

  useEffect(() => {
    getAllJobsForUser();
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!jobs || !jobs.length) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  const thisJob = jobs.find((j) => j._id === jobId);

  const isLong = thisJob.note.length > MAX_LENGTH;
  const displayText = expanded
    ? thisJob.note
    : thisJob.note.slice(0, MAX_LENGTH);

  if (!thisJob) {
    return <div>No Job Found</div>;
  }
  // console.log("thisJob : ", thisJob);
  return (
    <div className="h-screen w-screen">
      <div
        className={`min-h-screen flex items-center justify-center bg-gray-100 transform transition-all duration-700 ease-in-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      >
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{thisJob.title}</h2>
            <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-md">
              {thisJob.status}
            </span>
          </div>

          {/* Company Info */}
          <div className="space-y-1 mb-4 text-gray-600">
            <p className="flex items-center">
              {/* You can add an icon here */}
              {thisJob.company}
            </p>
            <p className="flex items-center">
              {/* You can add an icon here */}
              {thisJob.jobLocation}
            </p>
          </div>

          {/* Dates */}
          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <p>{new Date(thisJob.createdAt).toLocaleDateString()}</p>
            <p>{new Date(thisJob.updatedAt).toLocaleDateString()}</p>
          </div>

          <hr className="my-4" />

          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <div className="max-h-32 overflow-y-auto text-md text-gray-700 whitespace-pre-line jobpage">
              {thisJob.description}
            </div>
          </div>

          <hr className="my-4" />

          {/* Job Details */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Job Details</h3>
            <p className="text-gray-700 text-sm">
              Position: {thisJob.positionType}
            </p>
            <p className="text-gray-700 text-sm">Note:</p>

            <div
              className={`whitespace-pre-line jobpage transform transition-all duration-500 ease-in-out ${
                expanded
                  ? "max-h-32 overflow-y-auto"
                  : "max-h-12 overflow-hidden"
              }`}
            >
              {displayText}
              {/* {isLong && !expanded && <span className="font-bold"> ...</span>} */}
            </div>
            {isLong && (
              <button onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                  <span className="font-bold">Show Less</span>
                ) : (
                  <span className="font-bold"> ...Read More</span>
                )}
              </button>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <Link
              to={`/update_job/${thisJob._id}`}
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Edit
            </Link>
            <button onClick={() => setShowConfirm(true)}>Delete</button>
            {showConfirm && <Delete jobId={thisJob._id} />}
            <Link
              to={"/"}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobpage;
