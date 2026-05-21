import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import CategoryManager from "../Contents/CategoryManager";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="user-card">
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      <CategoryManager/>
    </div>
  );
};

export default Settings;