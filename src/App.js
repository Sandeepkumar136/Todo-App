import React from "react";
import Navbar from "./Navigations/Navbar";
import "./Sass/Style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Analytics from "./Components/Analytics";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;