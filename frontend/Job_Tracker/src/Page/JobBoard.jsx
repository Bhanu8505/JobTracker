import React, { useEffect, useState } from "react";

import { useAuth } from "../Utils/UseAuth";
import { Link } from "react-router-dom";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import JobCard from "../Components/JobCard";
import Column from "../Components/Column";

const columns = [
  { id: "Interested", title: "Interested" },
  { id: "Applied", title: "Applied" },
  { id: "Scheduled", title: "Scheduled" },
  { id: "Selected", title: "Selected" },
  { id: "Rejected", title: "Rejected" },
];

const JobBoard = () => {
  const { jobs, getAllJobsForUser, logout } = useAuth();
  const [activeJob, setActiveJob] = useState(null);
  const [localJobs, setLocalJobs] = useState([]);

  useEffect(() => {
    getAllJobsForUser();
  }, []);

  useEffect(() => {
    setLocalJobs(jobs);
  }, [jobs]);

  const getJobByStatus = (status) => {
    return localJobs.filter((job) => job.status === status);
  };

  // console.log("Jobs in JobBoard : ", jobs);
  // console.log("Local Jobs in JobBoard : ", localJobs);

  const handleDragStart = (event) => {
    // console.log("In handleDragStart");
    const job = localJobs.find((j) => j._id === event.active.id);
    // console.log("Job ib HandleDragStart ", job);
    setActiveJob(job);
  };

  const handleDragEnd = (event) => {
    console.log("In HandleDragEnd");
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;
    console.log("Over :", over);
    const jobId = active.id;
    const newStatus = over.id;

    console.log("Dropped job", jobId, "into column", newStatus);
    console.log("over.id:", over.id, "jobId:", active.id);
    console.log("LocalJobs before", localJobs);
    setLocalJobs((prev) =>
      prev.map((j) => (j._id === jobId ? { ...j, status: newStatus } : j))
    );
    console.log("LocalJobs after", localJobs);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-auto bg-white shadow-2xl rounded-lg p-6">
      <div className="flex justify-between px-4">
        <h1 className="flex items-center  w-fit rounded-md font-bold text-lg">
          My 2025 Job Applications
        </h1>
        <Link
          to="/add_job"
          className="cursor-pointer m-2 px-2 py-1 text-left border-2 w-fit rounded-md font-bold text-lg"
        >
          Add Job
        </Link>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 overflow-x-auto p-4 gap-4">
          {columns.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                jobs={getJobByStatus(column.id)}
              />
            );
          })}
        </div>
        <DragOverlay>
          {activeJob ? <JobCard data={activeJob} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default JobBoard;
