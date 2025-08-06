import React from "react";
import { Link } from "react-router-dom";

const View = ({ jobId }) => {
  return (
    <div className="m-1 p-1">
      <Link
        to={`/job/${jobId}`}
        className="cursor-pointer underline underline-offset-1"
      >
        All Details
      </Link>
    </div>
  );
};

export default View;
