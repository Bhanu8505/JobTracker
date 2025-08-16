import { useDroppable } from "@dnd-kit/core";
import React from "react";
import JobCard from "./JobCard";

const Column = ({ column, jobs }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      key={column.id}
      id={column.id}
      ref={setNodeRef}
      className="flex flex-col flex-1 rounded-lg p-3 bg-gray-100 min-w-xs"
    >
      <div className="font-bold mb-3 text-lg w-full flex justify-center">
        <h2>{column.title}</h2>
      </div>
      <div className="space-y-3 flex-1 ">
        {/* {<Jobs key={`${column.id}`} data={getJobByStatus(column.id)} />} */}
        {jobs.map((job) => (
          <JobCard key={job._id} data={job} />
        ))}
      </div>
    </div>
  );
};

export default Column;
