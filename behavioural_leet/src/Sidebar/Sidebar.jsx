import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { faUser, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/problems">
            <FontAwesomeIcon icon={faBook} />
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
