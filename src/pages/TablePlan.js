import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export const tablesLoader = async () => {
  const res = await fetch("/table");
  if (!res.ok) {
    throw new Error("Could not fetch the Tables");
  }
  return res.json();
};

const RestaurantLayout = () => {
  const tables = useLoaderData();
  // eslint-disable-next-line no-unused-vars
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
  };

  const zones = Array.from(new Set(tables.map((table) => table.zone)));

  return (
    <div className="restaurant-layout">
      {zones.map((zone) => (
        <div key={zone} className="zone">
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
                  onClick={() => handleTableClick(table.table_id)}
                >
                  {table.table_number}
                  <div className="stars">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`star ${
                          index < table.rating ? "filled" : ""
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantLayout;
