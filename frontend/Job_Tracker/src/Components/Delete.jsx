import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";

const Delete = ({ jobId }) => {
  const { deleteJob } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setShowConfirm(true);
    setTimeout(() => setShowModal(true), 10);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setShowConfirm(false), 300);
  };

  const submitHandler = async () => {
    const res = await deleteJob(jobId);
    console.log("Delete request sent");

    if (res.success) {
      navigate(0);
    } else {
      console.log("Error deleting job : ", res.message || "Error deleting Job");
    }
  };

  return (
    <div>
      <button onClick={openModal} className="cursor-pointer">
        Delete
      </button>
      {showConfirm && (
        <div
          className={`fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center transform transition-all duration-300 ${
            showModal ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this job?
            </h2>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={submitHandler}
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete;
