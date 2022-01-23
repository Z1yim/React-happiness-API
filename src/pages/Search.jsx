import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import "../css/App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import SearchDropdown from "../components/SearchDropdown";
import SetChartData from "../components/SetChartData";

export default function Search() {
  const COLUMNS = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country", sortable: true },
    { headerName: "Score", field: "score", sortable: true },
    { headerName: "Year", field: "year", sortable: true },
  ];
  const CHART_OPTIONS = {
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 0,
    },
    scales: {
      y: {
        reverse: true,
      },
    },
  };
  const INIT_COUNTRY = "Afghanistan";

  const [countryList, setCountryList] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [chartData, setChartData] = useState();
  const [queryCountry, setQueryCountry] = useState(INIT_COUNTRY);
  const [loadingRanks, setLoadingRanks] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [error, setError] = useState(null);

  const dropdownFilter = SearchDropdown(
    countryList,
    queryCountry,
    setQueryCountry,
    "Filter Country"
  );

  function Content() {
    if (error) {
      return (
        <div>
          <p>Something went wrong: {error.message}</p>
        </div>
      );
    }

    if (loadingRanks || loadingCountries) {
      return (
        <div>
          <h2>loading...</h2>
        </div>
      );
    }

    return (
      <div className="main-content">
        <h2>Rankings by Country</h2>
        <div className="ag-theme-balham-dark table" style={{ width: "90%" }}>
          <AgGridReact
            columnDefs={COLUMNS}
            rowData={rowData}
            domLayout="autoHeight"
          />
        </div>
        <h2>Chart</h2>
        <div className="chart">
          <Line data={chartData} options={CHART_OPTIONS} />
        </div>
      </div>
    );
  }

  useEffect(() => {
    setLoadingCountries(true);
    getCountries()
      .then((entries) => {
        setCountryList(entries);
        setLoadingCountries(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    setLoadingRanks(true);
    getRankingsByCountry(queryCountry)
      .then((entries) => {
        setRowData(entries);
        SetChartData(setChartData, getChartData(entries));
        setLoadingRanks(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [queryCountry]);

  return (
    <div className="hero">
      <h1>Search by Country</h1>
      {dropdownFilter.dropdownMenu()}
      <Content />
    </div>
  );
}

function getCountries() {
  const url = "http://131.181.190.87:3000/countries";
  return fetch(url).then((res) => res.json());
}

function getRankingsByCountry(query) {
  const url = `http://131.181.190.87:3000/rankings?country=${query}`;
  return fetch(url)
    .then((res) => res.json())
    .then((entries) =>
      entries.map((entry) => {
        return {
          rank: entry.rank,
          country: entry.country,
          score: entry.score,
          year: entry.year,
        };
      })
    )
    .then((entries) =>
      entries.sort((a, b) => (a.year > b.year ? 1 : b.year > a.year ? -1 : 0))
    );
}

function getChartData(entries) {
  let labels = [];
  let data = [];

  entries.forEach((entry) => {
    labels.push(entry.year);
    data.push(entry.rank);
  });

  return {
    labels: labels,
    data: data,
  };
}
