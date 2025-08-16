import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";

const Deletepage = () => {
  const { deleteJob } = useAuth();
  const { jobId } = useParams();

  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      await deleteJob(jobId);
      console.log("Delete request sent");
      navigate("/");
    } catch (error) {
      console.log(
        "Error deleting job : ",
        error.response?.data || error.message
      );
      navigate("/");
    }
  };
  return (
    <div className="h-screen w-screen">
      <div className="h-[3%] p-2 text-lg">
        <Link to="/">Go Back</Link>
      </div>
      <div className="flex justify-center items-center h-[97%]">
        <div className="border-2 p-8 text-xl rounded-md">
          <h2 className="m-4">Are You Sure you want to delete this Job</h2>
          <div className="flex justify-around m-2">
            <button
              className="cursor-pointer border-2 px-4 py-1 rounded-md"
              onClick={submitHandler}
            >
              Yes
            </button>
            <Link
              className="cursor-pointer border-2 px-4 py-1 rounded-md"
              to="/"
            >
              No
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deletepage;
