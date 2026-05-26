import React, { useEffect, useRef, useState } from "react";
import Image_Exporter from "../Assets/ImageExporter";
import Tooltip from "../Contents/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import TaskSuggestions from "../Contents/TaskSuggestions";
import { useTaskSearch } from "../Context/TaskSearchContext";
import { useAuth } from "../Context/AuthContext";
import { getNotifications } from "../Contents/NotificationHistoryService";

const Navbar = () => {
  const { user } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      try {
        const response = await getNotifications(user.$id);

        setNotificationCount(response.total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [user]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { searchQuery, setSearchQuery } = useTaskSearch();

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setShowSuggestions(false);
    navigate("/tasks");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <img src={Image_Exporter.logo} alt="Logo" className="nav-logo" />

        <div className="nav-contains">
          <div className="searchbar-contain-inc-sugg">
            <div className="searchbar-contain">
              <input
                placeholder="Search tasks..."
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />

              <i className="bx bx-search" onClick={handleSearch}></i>
            </div>

            <TaskSuggestions
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
            />
          </div>
        </div>
      </nav>

      <aside className="sidebar">
        <ul className="sidebar-list">
          <li>
            <Tooltip text="Home">
              <Link to="/" className="sidebar-items">
                <i className="bx bx-home"></i>
              </Link>
            </Tooltip>
          </li>

          <li>
            <Tooltip text="Tasks">
              <Link to="/tasks" className="sidebar-items">
                <i className="bx bx-checklist"></i>
              </Link>
            </Tooltip>
          </li>

          <li>
            <Tooltip text="Analytics">
              <Link to="/analytics" className="sidebar-items">
                <i className="bx bx-doughnut-chart"></i>
              </Link>
            </Tooltip>
          </li>

          <li>
            <Tooltip text="Alerts">
              <Link to="/notifications" className="sidebar-items">
                <i className="bx bx-bell"></i>
                {notificationCount > 0 && (
                  <span className="notification-dot"></span>
                )}
              </Link>
            </Tooltip>
          </li>

          <li>
            <Tooltip text="Settings">
              <Link to="/settings" className="sidebar-items">
                <i className="bx bx-cog"></i>
              </Link>
            </Tooltip>
          </li>
        </ul>
      </aside>
      <ul className="bottom-nav">
        <Link to="/" className="bottom-items">
          <i className="bx bx-home"></i>
        </Link>
        <Link to="/tasks" className="bottom-items">
          <i className="bx bx-checklist"></i>
        </Link>
        <Link to="/analytics" className="bottom-items">
          <i className="bx bx-doughnut-chart"></i>
        </Link>
        <Link to="/notifications" className="bottom-items">
          <i className="bx bx-bell"></i>{" "}
          {/* {notificationCount > 0 && <span className="notification-dot"></span>} */}
        </Link>
        <Link to="/settings" className="bottom-items">
          <i className="bx bx-cog"></i>
        </Link>
      </ul>
    </>
  );
};

export default Navbar;
