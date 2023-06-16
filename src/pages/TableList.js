import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import _ from "lodash";
import Spinner from "../component/Spinner";

export const tableLoader = async () => {
  const res = await fetch("/table");
  if (!res.ok) {
    throw new Error("Could not fetch the Tables");
  }
  return res.json();
};

function status(props) {
  if (props === true) {
    return <div className="info">Available</div>;
  } else {
    return <div className="danger">Booked</div>;
  }
}

const TableListPage = () => {
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [filteredTables, setFilteredTables] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const data = await tableLoader();
          setTables(data);
          setFilteredTables(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, 0); // Simulate a 2-second delay for loading data

    return () => clearTimeout(timer);
  }, []);

  const filterTablesByZone = (zone) => {
    const filteredTables = tables.filter((table) => table.zone === zone);
    return filteredTables;
  };

  const handleAddToReservation = (e) => {
    let reservation = [];

    if (localStorage.getItem("reservation")) {
      reservation = JSON.parse(localStorage.getItem("reservation"));
      // Clear old data in localStorage
      localStorage.removeItem("reservation");
    }

    const updatedReservation = [
      ...reservation.filter((item) => item.table_id === e.table_id),
      { ...e, count: 1 },
    ];

    // Add new data to localStorage
    localStorage.setItem("reservation", JSON.stringify(updatedReservation));
  };

  const zones = Array.from(new Set(tables.map((table) => table.zone)));

  return (
    <>
      <div className="restaurant-layout">
        {zones.map((zone, index) => (
          <div key={index} className="zone">
            <h2>Zone {zone}</h2>
            <div className="tables">
              {tables
                .filter((table) => table.zone === zone)
                .map((table) => (
                  <div
                    key={table.table_id}
                    className={`table ${
                      table.available ? "reserved" : "selected"
                    }`}
                    // onClick={() => handleTableClick(table.table_id)}
                  >
                    {table.available ? (
                      <Link
                        to={table.table_id}
                        onClick={() => handleAddToReservation(table)}
                      >
                        {table.table_number}
                      </Link>
                    ) : (
                      <div>{table.table_number}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="title-table">TABLES</h1>
          <div className="button-group">
            <button onClick={() => setFilteredTables(tables)}>Zones</button>{" "}
            <button onClick={() => setFilteredTables(filterTablesByZone("A"))}>
              Zone A
            </button>{" "}
            <button onClick={() => setFilteredTables(filterTablesByZone("B"))}>
              Zone B
            </button>{" "}
            <button onClick={() => setFilteredTables(filterTablesByZone("C"))}>
              Zone C
            </button>{" "}
            <button onClick={() => setFilteredTables(filterTablesByZone("D"))}>
              Zone D
            </button>
          </div>
          <div className="content-table">
            <div className="table-list">
              {filteredTables.map((table) => (
                <div key={table.table_id} className="table-item">
                  <div className="img-table">
                    <img
                      src={require(`../img/${table.table_number}.jpg`)}
                      alt=""
                      style={{
                        width: "320px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {table.available ? (
                    <Link
                      to={table.table_id}
                      onClick={() => handleAddToReservation(table)}
                    >
                      <h2>Table {table.table_number}</h2>
                    </Link>
                  ) : (
                    <h2>Table {table.table_number}</h2>
                  )}
                  <p>Seats {table.capacity}</p>
                  <div className="status">{status(table.available)}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TableListPage;
