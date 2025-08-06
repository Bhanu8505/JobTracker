import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";

const UpdateJob = () => {
  const { jobs, getAllJobsForUser, updateJob } = useAuth();
  const { jobId } = useParams();
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllJobsForUser();
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!jobs || !jobs.length) return <div>Loading...</div>;

  const job = jobs.find((allJobs) => jobId === allJobs._id);

  if (!job) return <div>Specified job not found</div>;

  const [formData, setFormData] = useState({
    description: job.description,
    company: job.company,
    status: job.status,
    title: job.title,
    note: job.note,
    jobLocation: job.jobLocation,
    positionType: job.positionType,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await updateJob(formData, job._id);
    console.log("res in updatejob : ", res);
    if (res.success) {
      console.log("Update Job form data sent");
      navigate("/");
    } else {
      console.log("Error in UpdateJob : ", res.data.message);
      setError(res.data.message);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/2">
        <div
          className={`h-screen w-full bg-[url('/UpdateImage.png')] bg-cover bg-no-repeat rounded-r-xl transform transition-all duration-700 ease-in-out ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        ></div>
      </div>
      <div className="flex flex-col h-screen w-1/2">
        <div className="h-[3vh] flex justify-end m-4 text-lg">
          <Link to={`/job/${jobId}`}>Go Back</Link>
        </div>
        <div
          className={`flex justify-center items-center h-[97vh] w-full transform transition-all duration-700 ease-in-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <form
            onSubmit={submitHandler}
            className="flex flex-col border-2 p-6 rounded-md gap-4 w-[60%]"
          >
            <div className="flex justify-center items-center">
              {error && <p className="text-red-500 text-lg">{error}</p>}
            </div>

            <div className="flex flex-col justify-start gap-5">
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

            <div className="flex flex-col justify-start gap-5">
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

            <div className="flex flex-col justify-start gap-5">
              <label htmlFor="note" className="w-40 text-left text-xl">
                Note
              </label>
              <textarea
                name="note"
                onChange={handleChange}
                value={formData.note}
                id="note"
                className="rounded-md p-2 flex-1 text-lg border-2 h-32 resize-none overflow-auto jobpage"
              />
            </div>

            <div className="flex flex-col justify-start gap-5">
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

            <div className="flex justify-center items-center">
              <button className="mt-4 px-4 py-2 border-2 rounded-md">
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
