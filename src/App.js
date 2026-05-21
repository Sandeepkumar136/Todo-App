import React from "react";
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

// User Authentication

// Context
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ProtectedRoute from "./Auth/ProtectedRoute";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
    </>
  );
};

const ProtectedLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
};

const App = () => {
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

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;