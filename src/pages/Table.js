import React from "react";
import "./Table.css";
import { useLoaderData } from "react-router-dom";

export const loadReserve = async () => {
  const res = await fetch("/reserve");
  if (!res.ok) {
    throw Error("Could not fetch the reserve");
  }

  return res.json();
};
function status(props) {
  if (props === true) {
    return <div className="infos">Available</div>;
  } else {
    return <div className="dangers">Booked</div>;
  }
}

function Table() {
  const myrerve = useLoaderData();

  const MyreserveRows = myrerve.map((e, index) => (
    <tr key={index}>
      <td>{e.tableInfo.table_number}</td>
      <td>{e.tableInfo.zone}</td>
      <td>{e.customerName}</td>
      <td>{e.reservationDate}</td>
      <td>{e.reservationTime}</td>
      <td>{status(e.tableInfo.available)}</td>
    </tr>
  ));

  // Function to handle searching/filtering the table

  return (
    <div className="tab-container">
      <table className="reserve-table">
        <thead>
          <tr>
            <th>Table No.</th>
            <th>Zone</th>
            <th>Name</th>
            <th>Date Booking</th>
            <th>Time Booking</th>
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

export default Table;
