import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Homepage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import { useAuth } from "./Utils/UseAuth";
import Jobpage from "./Page/Jobpage";
import AddJob from "./Page/AddJob";
import UpdateJob from "./Page/UpdateJob";
import RegisterPage from "./Page/RegisterPage";

function App() {
  const { authUser, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/job/:jobId"
          element={!authUser ? <LoginPage /> : <Jobpage />}
        />
        <Route
          path="/add_job"
          element={!authUser ? <LoginPage /> : <AddJob />}
        />
        <Route
          path="/update_job/:jobId"
          element={!authUser ? <LoginPage /> : <UpdateJob />}
        />
        <Route
          path="/register"
          element={!authUser ? <RegisterPage /> : <Homepage />}
        />
      </Routes>
    </div>
  );
}

export default App;
