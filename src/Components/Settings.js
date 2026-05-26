import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import CategoryManager from "../Contents/CategoryManager";
import { useDarkMode } from "../Context/DarkModeContext";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useDarkMode();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your profile, appearance, and categories</p>
      </div>

      {/* Profile */}
      <div className="settings-card profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0)}
        </div>

        <div className="profile-details">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <i className="bx bx-log-out"></i>
          Logout
        </button>
      </div>

      {/* Theme */}
      <div className="settings-card">
        <h3 className="section-title">
          Appearance
        </h3>

        <div className="theme-buttons">
          <button
            className={`theme-btn ${
              theme === "light"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setTheme("light")
            }
          >
            <i className="bx bx-sun"></i>
            Light
          </button>

          <button
            className={`theme-btn ${
              theme === "dark"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setTheme("dark")
            }
          >
            <i className="bx bx-moon"></i>
            Dark
          </button>

          <button
            className={`theme-btn ${
              theme === "system"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setTheme("system")
            }
          >
            <i className="bx bx-laptop"></i>
            System
          </button>
        </div>

        <p className="theme-info">
          System mode follows your OS
          appearance settings.
        </p>
      </div>

      {/* Categories */}
      <div className="settings-card category-section">
        <div className="category-header">
          <h3 className="section-title">
            Categories
          </h3>

          <p>
            Manage your task categories
          </p>
        </div>

        <CategoryManager />
      </div>
    </div>
  );
};

export default Settings;