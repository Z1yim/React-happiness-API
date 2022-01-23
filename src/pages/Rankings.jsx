import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import Dropdown from "../components/Dropdown";

export default function Rankings() {
  const COLUMNS = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country", sortable: true },
    { headerName: "Score", field: "score", sortable: true },
    { headerName: "Year", field: "year", sortable: true },
  ];
  const DROPDOWN_OPTIONS = [2020, 2019, 2018, 2017, 2016, 2015];

  const [rowData, setRowData] = useState([]);
  const [queryYear, setQueryYear] = useState(DROPDOWN_OPTIONS[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dropdownFilter = Dropdown(
    DROPDOWN_OPTIONS,
    queryYear,
    setQueryYear,
    "Display Year"
  );

  function Content() {
    if (error) {
      return (
        <div>
          <p>Something went wrong: {error.message}</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div>
          <h2>loading...</h2>
        </div>
      );
    }

    return (
      <div className="main-content">
        <div className="ag-theme-balham-dark table" style={{ width: "90%" }}>
          <AgGridReact
            columnDefs={COLUMNS}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
            domLayout="autoHeight"
          />
        </div>
      </div>
    );
  }

  useEffect(() => {
    setLoading(true);
    getRankingsByYear(queryYear)
      .then((entries) => {
        setRowData(entries);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [queryYear]);

  return (
    <div className="hero">
      <h1>Rankings</h1>
      {dropdownFilter.dropdownMenu()}
      <Content />
    </div>
  );
}

function getRankingsByYear(query) {
  const url = `http://131.181.190.87:3000/rankings?year=${query}`;
  return fetch(url)
    .then((res) => res.json())
    .then((entries) =>
      entries.map((entry) => {
        return {
          key: entry.rank,
          rank: entry.rank,
          country: entry.country,
          score: entry.score,
          year: entry.year,
        };
      })
    );
}
