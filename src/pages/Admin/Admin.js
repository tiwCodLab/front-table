import React from "react";

import "./../Adminpage.css";
import AdminSidebar from "./AdminSidbar";
import AdminTable from "./AdminTable";

function Admin() {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <AdminTable />
    </div>
  );
}

export default Admin;
