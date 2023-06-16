import React from "react";
import "./../Table.css";
import { useLoaderData } from "react-router-dom";

function status(props) {
  if (props === true) {
    return <div className="infos">Available</div>;
  } else {
    return <div className="dangers">Booked</div>;
  }
}

function AdminTable() {
  const myrerve = useLoaderData();

  const MyreserveRows = myrerve.map((e, index) => (
    <tr key={index}>
      <td>{e.table_number}</td>
      <td>{e.zone}</td>
      <td>{status(e.available)}</td>
    </tr>
  ));

  // Function to handle searching/filtering the table

  return (
    <div className="admin-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Table No.</th>
            <th>Zone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myrerve.length ? (
            MyreserveRows
          ) : (
            <div className="nothavebooking">Not have Booking List</div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
