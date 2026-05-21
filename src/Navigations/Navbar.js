import React from "react";
import Image_Exporter from "../Assets/ImageExporter";
import Tooltip from "../Contents/Tooltip";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <img src={Image_Exporter.logo} alt="Logo" className="nav-logo" />

        <div className="nav-contains">
          <div className="searchbar-contain">
            <input placeholder="Search..." type="text" />
            <i className="bx bx-search"></i>
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
