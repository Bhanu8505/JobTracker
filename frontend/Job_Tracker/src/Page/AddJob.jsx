import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/UseAuth";
import { Link, useNavigate } from "react-router-dom";

const AddJob = () => {
  const { addJob } = useAuth();

  const [formData, setFormData] = useState({
    description: "",
    company: "",
    status: "Interested",
    title: "",
    note: "",
    jobLocation: "",
    positionType: "Full-Time",
  });

  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await addJob(formData);
    if (res.success) {
      console.log("Add Job Form submitted");
      setFormData({
        description: "",
        company: "",
        status: "Interested",
        title: "",
        note: "",
        jobLocation: "",
        positionType: "Full-Time",
      });
      navigate("/");
    } else {
      console.log("Error in AddJob", error);
      console.log("Error : ", res.message);
      setError(res.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex">
      <div
        className={`w-[40%] h-full flex justify-center items-center transform transition-all duration-800 ease-in-out ${
          loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        } `}
      >
        <img
          className="object-cover rounded-r-lg h-full w-full"
          src="/public/LoginImage.png"
        />
      </div>

      <div className={`w-[60%] h-full `}>
        <div className={`flex justify-end p-3 text-lg `}>
          <Link
            to="/"
            className={` px-2 py-1 border-gray-200 bg-blue-900 shadow-lg text-white font-bold text-lg  rounded-lg h-fit  transform transition-all duration-800 ease-in-out ${
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            Go Back
          </Link>
        </div>
        <div
          className={`flex justify-center items-center p-3 transform transition-all duration-800 ease-in-out ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
          }`}
        >
          <form
            onSubmit={submitHandler}
            className="flex flex-col border-2 p-2 rounded-md gap-4 w-[85%]"
          >
            <div className="flex items-center gap-10">
              <label htmlFor="description" className=" w-40 text-left text-xl">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                value={formData.description}
                id="description"
                className="rounded-md p-2 flex-1 text-lg border-2 h-32 resize-none overflow-auto"
              />
            </div>

            <div className="flex items-center gap-10">
              <label htmlFor="company" className="w-40 text-left text-xl">
                Company
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={formData.company}
                name="company"
                id="company"
                className=" rounded-md text-xl p-2 flex-1 border-2"
              />
            </div>

            <div className="flex items-center gap-10">
              <label htmlFor="status" className="w-40 text-left text-xl">
                Status
              </label>
              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
                id="status"
                className="rounded-md p-2 flex-1 text-xl border-2"
              >
                <option value="Interested">Interested</option>
                <option value="Applied">Applied</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-10">
              <label htmlFor="title" className="w-40 text-left text-xl">
                Job Title
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={formData.title}
                name="title"
                id="title"
                className="rounded-md p-2 flex-1 text-xl border-2"
              />
            </div>

            <div className="flex items-center gap-10">
              <label htmlFor="note" className="w-40 text-left text-xl">
                Note
              </label>
              <textarea
                name="note"
                onChange={handleChange}
                value={formData.note}
                id="note"
                className="rounded-md p-2 flex-1 text-lg border-2 h-32 resize-none overflow-auto"
              />
            </div>

            <div className="flex items-center gap-10">
              <label htmlFor="jobLocation" className="w-40 text-left text-xl">
                Location
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={formData.jobLocation}
                name="jobLocation"
                id="jobLocation"
                className="rounded-md p-2 flex-1 text-xl border-2"
              />
            </div>

            <div className="flex items-center gap-10">
              <label htmlFor="positionType" className="w-40 text-left text-xl">
                Position Type
              </label>
              <select
                name="positionType"
                onChange={handleChange}
                value={formData.positionType}
                id="positionType"
                className="rounded-md p-2 flex-1 text-xl border-2"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="flex justify-center items-center">
              <button className="mt-3 px-4 py-2 bg-blue-900 text-white font-bold text-lg  rounded-lg h-fit">
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
