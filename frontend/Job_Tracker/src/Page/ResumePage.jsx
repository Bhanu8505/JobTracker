import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/UseAuth";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const ResumePage = () => {
  const { authUser, uploadResume, deleteResume, downloadResume } = useAuth();

  const [pdfFile, setPdfFile] = useState(null);
  const [uploadedPdfUrl, setuploadedPdfUrl] = useState(
    authUser?.resume?.url || ""
  );
  const [uploading, setUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //   console.log("User in ResumePage", authUser);
  const openModal = () => {
    setShowConfirm(true);
    setTimeout(() => setShowModal(true), 10);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setShowConfirm(false), 300);
  };

  const handleChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", pdfFile);
    setUploading(true);
    const res = await uploadResume(formData);
    console.log(res);
    setUploading(false);

    if (res.success) {
      setuploadedPdfUrl(res?.data);
    } else {
      console.log("error uploading Resume", res?.message);
    }
  };

  const handleDelete = async () => {
    setUploading(true);
    const res = await deleteResume();
    setUploading(false);
    if (res.success) {
      console.log("Success");
    } else {
      console.log(res.message);
    }
    setShowModal(false);
    navigate(0);
  };

  const handleDownload = async () => {
    try {
      const res = await downloadResume();
      const url = window.URL.createObjectURL(res.blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading resume", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-300">
      <div className="flex justify-between  p-2 mb-3 mr-5">
        <Link
          to="/"
          className="px-2 py-2 border-gray-200 bg-violet-400 shadow-lg text-white font-bold text-lg  rounded-lg h-fit"
        >
          Home
        </Link>
        <Navbar />
      </div>
      <div
        className={`flex justify-center items-center w-full transform transition-all duration-700 ease-in-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } `}
      >
        <div className="flex flex-col w-full justify-center items-center p-2">
          {uploadedPdfUrl && (
            <div className="border-none jobpage">
              <iframe
                className="jobpage w-2xl h-100 overflow-hidden"
                src={uploadedPdfUrl}
              ></iframe>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full p-2"
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleChange}
              className="p-2 flex text-gray-700 border-2 rounded-lg text-center focus:outline-none transition"
            />
            <button
              type="submit"
              className="px-2 py-1 border-gray-200 bg-violet-400 shadow-lg text-white font-bold text-lg mt-2 rounded-lg"
            >
              Upload Resume
            </button>
          </form>
          <div className="flex gap-10">
            {uploadedPdfUrl && (
              <button
                onClick={openModal}
                className="px-2 py-1 border-gray-200 bg-violet-400 shadow-lg text-white font-bold text-lg mt-2 rounded-lg"
              >
                delete
              </button>
            )}
            {showConfirm && (
              <div
                className={`fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center transform transition-all duration-300 ${
                  showModal ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              >
                <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full text-center">
                  <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete this resume?
                  </h2>
                  <div className="flex justify-around">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={handleDelete}
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
            {uploadedPdfUrl && (
              <button
                onClick={handleDownload}
                className="px-2 py-1 border-gray-200 bg-violet-400 shadow-lg text-white font-bold text-lg mt-2 rounded-lg"
              >
                Download
              </button>
            )}
            {uploadedPdfUrl && (
              <a
                href={uploadedPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 border-gray-200 bg-violet-400 shadow-lg text-white font-bold text-lg mt-2 rounded-lg"
              >
                View
              </a>
            )}
          </div>
        </div>
      </div>

      {uploading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/50 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        </div>
      )}
    </div>
  );
};

export default ResumePage;
