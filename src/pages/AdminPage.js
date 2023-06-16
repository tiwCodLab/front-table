import React from "react";
import Sidebar from "../pages/Sidebar";
import Table from "../pages/Table";
import "./Adminpage.css";

function Adminpage() {
  return (
    <div className="admin-page">
      <Sidebar />
      <Table />
    </div>
  );
}

export default Adminpage;
