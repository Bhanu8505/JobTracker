import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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
      return {
        success: true,
      };
    } catch (error) {
      console.log("Error Signing up", error.response?.data || error.message);
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
      return {
        success: true,
      };
    } catch (error) {
      console.log(
        "error while logging in : ",
        error.response?.data || error.message
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
      return {
        success: true,
      };
    } catch (error) {
      console.log(
        "Error while adding Job : ",
        error.response?.data || error.message
      );
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
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      console.log(
        "Error while updating Job : ",
        error.response?.data || "Error Updating Job"
      );
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
    } catch (error) {
      console.log(
        "Error deleting job : ",
        error.response?.data || error.message
      );
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/api/v1/users/logout", {
        withCredentials: true,
      });
      setAuthUser(null);
    } catch (error) {
      console.error(
        "error logging out user : ",
        error.response?.data?.message || error.message
      );
      setAuthUser(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
