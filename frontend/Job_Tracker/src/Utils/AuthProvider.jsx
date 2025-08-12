import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [jobs, setJobs] = useState([]);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/api/v1/users/get_me", {
        withCredentials: true,
      });
      setAuthUser(res.data.data);
      console.log("check Auth res : ", res);
    } catch (error) {
      console.log(
        "error checking auth user : ",
        error.response?.data || error.message
      );
      setAuthUser(null);
    }
  };

  const signUp = async (data) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/register",
        data,
        { withCredentials: true }
      );
      console.log("Signup request sent");
      toast.success(res.data?.message || "Succesfully Registered");
      return {
        success: true,
      };
    } catch (error) {
      console.log(
        "Error Signing up",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Error Signing up");
      return {
        success: false,
        message: error.response?.data?.message || "Error Signing Up",
      };
    }
  };

  const login = async (data) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("RES in AuthProvider : ", res.data.data);
      setAuthUser(res.data.data);
      toast.success(res?.data?.message || "Succesffuly Logged In");
      return {
        success: true,
      };
    } catch (error) {
      console.log(
        "error while logging in : ",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || error.message || "Error Logging in"
      );
      setAuthUser(null);
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  };

  const addJob = async (data) => {
    try {
      if (!authUser) console.log("Login First");

      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/jobs/job",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("New Job : ", res);
      toast.success(res?.data?.message || "Job Added Successfully");
      return {
        success: true,
      };
    } catch (error) {
      console.log(
        "Error while adding Job : ",
        error.response?.data || error.message
      );
      toast.error(error?.response?.data?.message || "Error adding Job");
      return {
        success: false,
        message: error?.response?.data?.message || "Error Adding Job",
      };
    }
  };

  const getAllJobsForUser = async () => {
    try {
      //implement paging logic here
      const res = await axios.get("http://127.0.0.1:3000/api/v1/jobs/job", {
        withCredentials: true,
      });
      console.log("Job in AuthProvider", res);
      setJobs(res.data.data);
    } catch (error) {
      console.error(
        "Error fetching Jobs : ",
        error.response?.data || error.message
      );
      setJobs(null);
    }
  };

  const updateJob = async (data, jobId) => {
    try {
      if (!authUser) console.log("Login First");

      const res = await axios.patch(
        `http://127.0.0.1:3000/api/v1/jobs/job/${jobId}`,
        data,
        { withCredentials: true }
      );
      console.log("Update job form submitted : ", res);
      toast.success(res?.data?.message || "Job Updated Successfully");
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      console.log(
        "Error while updating Job : ",
        error.response?.data || "Error Updating Job"
      );
      toast.error(error?.response?.data?.message || "Error Updating Job");
      return {
        success: false,
        data: error.response?.data?.message || "Error Updating Job",
      };
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:3000/api/v1/jobs/job/${jobId}`,
        { withCredentials: true }
      );
      console.log("Job deletion request sent");
      toast.success(res?.data?.message || "Job Deleted Successfully");
      return {
        success: true,
      };
    } catch (error) {
      console.log(
        "Error deleting job : ",
        error.response?.data || error.message
      );
      toast.error(error?.response?.data?.message || "Error Deleting Job");
      return {
        success: false,
        message: error?.response?.data?.message || "Error Deleting Job",
      };
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/api/v1/users/logout", {
        withCredentials: true,
      });
      setAuthUser(null);
      toast.success(res?.data?.message || "User Logged Out");
    } catch (error) {
      console.error(
        "error logging out user : ",
        error.response?.data?.message || error.message
      );
      toast.error(error?.response?.data?.message || "Error Logging Out");
      setAuthUser(null);
    }
  };

  const uploadResume = async (file) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/resume/upload?force=true",
        file,
        {
          withCredentials: true,
        }
      );
      console.log("Resume upload request sent");
      toast.success(res?.data?.message || "Resume Uploaded Succesfully");
      console.log(res);
      return {
        success: true,
        data: res?.data?.data?.url || "Resume URL",
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Resume Upload Failed");
      return {
        success: false,
        message: error?.response?.data?.message || "resume Upload Failed",
      };
    }
  };

  const deleteResume = async (url) => {
    try {
      const res = await axios.delete(
        "http://127.0.0.1:3000/api/v1/resume/delete_resume",
        {
          withCredentials: true,
        }
      );
      console.log("Resume delete request sent");
      toast.success(res?.data?.message || "Resume Deleted Succesfully");
      return {
        success: true,
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Resume Delete Failed");
      return {
        success: false,
        message: error?.response?.data?.message || "resume Delete Failed",
      };
    }
  };

  const downloadResume = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:3000/api/v1/resume/download",
        { withCredentials: true, responseType: "blob" }
      );
      console.log("Resume download request sent");
      console.log(res);
      // const blob = await res.blob();
      return {
        success: true,
        blob: res.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Error downloading Resume",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        jobs,
        signUp,
        getAllJobsForUser,
        checkAuth,
        logout,
        addJob,
        updateJob,
        deleteJob,
        uploadResume,
        deleteResume,
        downloadResume,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
