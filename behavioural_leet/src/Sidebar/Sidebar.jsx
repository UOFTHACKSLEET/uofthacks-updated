import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import {
  faUser,
  faBook,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src="../icon.png" alt="Icon" className="sidebar-icon" />
      <ul>
        <li>
          <Link to="/problems">
            <FontAwesomeIcon icon={faBook} />
          </Link>
        </li>
        <li>
          <Link to="/problem-list">
            <FontAwesomeIcon icon={faSquareCheck} />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
