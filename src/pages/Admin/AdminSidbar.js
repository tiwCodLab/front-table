import React from "react";
import "./../Sidebar.css"; // Assuming the CSS file is named Sidebar.css
import profile from "../../images/pfp.png"; // Assuming the profile picture file is named profile-pic.png
import logo from "../../images/lookkai.png"; // Assuming the logo file is named lookai.png
import booking from "../../images/calendar.png";
import table from "../../images/dashboard.png";
import logout from "../../images/logout.png";
import { useAuth } from "../../utils/AuthProvider";
import { Link, redirect } from "react-router-dom";

function AdminSidebar() {
  const auth = useAuth();
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <div className="profile">
        <img src={profile} alt="Profile" className="profile-pic" />
        <span className="profile-name">{auth.user.email}</span>
      </div>

      <div className="Nav">
        <ul>
          <li>
            <img src={booking} className="book" alt="x" />
            <span className="bookspan">Booking</span>
          </li>
          <li>
            <img src={table} className="table-pic" alt="x" />
            <Link to="/reservation">
              <span className="tablespan">Table</span>
            </Link>
          </li>
          <li>
            <img src={logout} className="log-out" alt="x" />
            <div
              className="singout"
              onClick={() => {
                auth.signout(() => redirect("/"));
              }}
            >
              <Link to="/">Sign Out</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
