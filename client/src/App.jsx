import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/home/dashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/secure/protectedRoute.jsx";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { CssBaseline, createTheme } from "@mui/material";
import PurgeProvider from "./context/purge.jsx";

const LazyProfile = React.lazy(() => import("./pages/profile/profile.jsx"));
const LazyContributions = React.lazy(() =>
  import("./pages/contributions/contributions.jsx")
);
const LazyProjects = React.lazy(() => import("./pages/projects/Projects.jsx"));
const LazyPost = React.lazy(() => import("./pages/contributions/Post.jsx"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  axios.defaults.withCredentials = true;

  const loading = useSelector((state) => state.loading.loading);

  return (
    <div className="main_wrapper">
      <PurgeProvider>
        <CssBaseline />
        <Spin spinning={loading} fullscreen />
        <Toaster richColors position="top-center" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<Spin fullscreen />}>
                  <LazyProfile />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<Spin fullscreen />}>
                  <LazyProjects />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/contributions"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<Spin fullscreen />}>
                  <LazyContributions />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<Spin fullscreen />}>
                  <LazyPost />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </PurgeProvider>
    </div>
  );
}

export default App;
