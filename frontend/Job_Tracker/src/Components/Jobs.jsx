import React from "react";
import Description from "./Description";
import Company from "./Company";
import Location from "./Location";
import Status from "./Status";
import View from "./View";
import Delete from "./Delete";

const Jobs = ({ data }) => {
  if (!data)
    return (
      <div className="flex justify-center items-center h-[80%] text-xl">
        <p>No data available </p>
      </div>
    );
  if (data && !Array.isArray(data)) return <p>Invalid Data</p>;
  return (
    <>
      {/* Implement paging logic */}
      {data.map((ele, idx) => (
        <div
          className="grid grid-cols-5 font-medium text-lg border-t-1"
          key={idx}
        >
          {ele.company && <Company data={ele} />}
          {ele.description && <Description data={ele} />}
          {ele.jobLocation && <Location data={ele} />}
          {ele.status && <Status data={ele} />}
          <div className="flex flex-row justify-around items-center">
            <View jobId={ele._id} />
            <Delete jobId={ele._id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Jobs;
