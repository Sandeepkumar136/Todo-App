import React, { useEffect } from "react";
import Navbar from "./Navigations/Navbar";
import "./Sass/Style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Pages
import Home from "./Components/Home";
import Analytics from "./Components/Analytics";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import Tasks from "./Components/Tasks";

// Auth
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ProtectedRoute from "./Auth/ProtectedRoute";

// Context
import { AuthProvider } from "./Context/AuthContext";
import { TaskSearchProvider } from "./Context/TaskSearchContext";

// Firebase
import { getForegroundMessage } from "./firebase/firebase";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </>
  );
};

const ProtectedLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <TaskSearchProvider>
        <Layout>{children}</Layout>
      </TaskSearchProvider>
    </ProtectedRoute>
  );
};

const App = () => {
  useEffect(() => {
    getForegroundMessage();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedLayout>
                <Home />
              </ProtectedLayout>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedLayout>
                <Analytics />
              </ProtectedLayout>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedLayout>
                <Notifications />
              </ProtectedLayout>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedLayout>
                <Settings />
              </ProtectedLayout>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedLayout>
                <Tasks />
              </ProtectedLayout>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;