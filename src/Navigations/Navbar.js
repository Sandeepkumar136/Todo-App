import React, { useEffect, useRef, useState } from "react";
import Image_Exporter from "../Assets/ImageExporter";
import Tooltip from "../Contents/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import TaskSuggestions from "../Contents/TaskSuggestions";
import { useTaskSearch } from "../Context/TaskSearchContext";

const Navbar = () => {
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

          <ul className="nav-list-p1">
            <li className="nav-items-p1">
              <Tooltip text="Theme">
                <i className="bx bx-sun"></i>
              </Tooltip>
            </li>

            <li className="nav-items-p1">
              <Tooltip text="User Profile">
                <i className="bx bx-user"></i>
              </Tooltip>
            </li>
          </ul>
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
    </>
  );
};

export default Navbar;
