import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import "../css/App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import SetChartData from "../components/SetChartData.js";
import Dropdown from "../components/Dropdown";
import SearchDropdown from "../components/SearchDropdown";

const token = localStorage.getItem("token");
const headers = {
  accept: "application/json",
  "Content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

export default function Factors(props) {
  const DROPDOWN_YEAR_OPTIONS = [2020, 2019, 2018, 2017, 2016, 2015];
  const DROPDOWN_FACTOR_OPTIONS = [
    "All",
    "Economy",
    "Family",
    "Health",
    "Freedom",
    "Generosity",
    "Trust",
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
        beginAtZero: true,
      },
    },
  };

  const [chartDataEconomy, setChartDataEconomy] = useState();
  const [chartDataFamily, setChartDataFamily] = useState();
  const [chartDataHealth, setChartDataHealth] = useState();
  const [chartDataFreedom, setChartDataFreedom] = useState();
  const [chartDataGenerosity, setChartDataGenerosity] = useState();
  const [chartDataTrust, setChartDataTrust] = useState();
  const [rowData, setRowData] = useState([]);
  const [queryYear, setQueryYear] = useState(DROPDOWN_YEAR_OPTIONS[0]);
  const [selectedFactor, setSelectedFactor] = useState(
    DROPDOWN_FACTOR_OPTIONS[0]
  );
  const [showTop10, setShowTop10] = useState(true);
  const [queryCountry, setQueryCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingFactors, setLoadingFactors] = useState(true);

  const dropdownYear = Dropdown(
    DROPDOWN_YEAR_OPTIONS,
    queryYear,
    setQueryYear,
    "Filter Year"
  );
  const dropdownFactor = Dropdown(
    DROPDOWN_FACTOR_OPTIONS,
    selectedFactor,
    setSelectedFactor,
    "Filter Factor"
  );
  const dropdownCountry = SearchDropdown(
    countryList,
    queryCountry,
    setQueryCountry,
    "Filter Country"
  );

  const columns = [
    { headerName: "Rank", field: "rank", sortable: true, width: 75 },
    { headerName: "Country", field: "country", sortable: true, width: 200 },
    { headerName: "Score", field: "score", sortable: true, width: 150 },
    {
      headerName: "Economy",
      field: "economy",
      sortable: true,
      width: 150,
      hide: !filterEconomy(),
    },
    {
      headerName: "Family",
      field: "family",
      sortable: true,
      width: 150,
      hide: !filterFamily(),
    },
    {
      headerName: "Health",
      field: "health",
      sortable: true,
      width: 150,
      hide: !filterHealth(),
    },
    {
      headerName: "Freedom",
      field: "freedom",
      sortable: true,
      width: 150,
      hide: !filterFreedom(),
    },
    {
      headerName: "Generosity",
      field: "generosity",
      sortable: true,
      width: 150,
      hide: !filterGenerosity(),
    },
    {
      headerName: "Trust",
      field: "trust",
      sortable: true,
      width: 150,
      hide: filterTrust() ? false : true,
    },
  ];

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
    setLoadingFactors(true);
    if (showTop10) {
      getFactorsLimit(queryYear)
        .then((entries) => {
          setRowData(entries);
          let chartDataRaw = getChartData(entries);
          SetChartData(setChartDataEconomy, chartDataRaw[0]);
          SetChartData(setChartDataFamily, chartDataRaw[1]);
          SetChartData(setChartDataHealth, chartDataRaw[2]);
          SetChartData(setChartDataFreedom, chartDataRaw[3]);
          SetChartData(setChartDataGenerosity, chartDataRaw[4]);
          SetChartData(setChartDataTrust, chartDataRaw[5]);
          setLoadingFactors(false);
        })
        .catch((error) => {
          setError(error);
        });
    }
    if (!showTop10) {
      getFactors(queryYear, queryCountry)
        .then((entries) => {
          setRowData(entries);

          setLoadingFactors(false);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [queryYear, showTop10, queryCountry]);

  function clearQueryCountry() {
    setQueryCountry("");
  }

  function filterEconomy() {
    return selectedFactor === "All" || selectedFactor === "Economy";
  }

  function filterFamily() {
    return selectedFactor === "All" || selectedFactor === "Family";
  }

  function filterHealth() {
    return selectedFactor === "All" || selectedFactor === "Health";
  }

  function filterFreedom() {
    return selectedFactor === "All" || selectedFactor === "Freedom";
  }

  function filterGenerosity() {
    return selectedFactor === "All" || selectedFactor === "Generosity";
  }

  function filterTrust() {
    return selectedFactor === "All" || selectedFactor === "Trust";
  }

  function Content() {
    if (error) {
      return (
        <div>
          <p>Something went wrong: {error.message}</p>
        </div>
      );
    }

    if (loadingFactors || loadingCountries) {
      return (
        <div>
          <h2>loading...</h2>
        </div>
      );
    }

    return (
      <div className="main-content">
        <h2>Happiness Factors</h2>
        <div className="ag-theme-balham-dark table" style={{ width: "90%" }}>
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
            domLayout="autoHeight"
          />
        </div>
        {showTop10 && (
          <div className="charts">
            {filterEconomy() && (
              <div className="chart-wrapper">
                <div className="chart-title">
                  <h2>Economy</h2>
                </div>
                <div className="chart">
                  <Bar data={chartDataEconomy} options={CHART_OPTIONS} />
                </div>
              </div>
            )}
            {filterFamily() && (
              <div className="chart-wrapper">
                <div className="chart-title">
                  <h2>Family</h2>
                </div>
                <div className="chart">
                  <Bar data={chartDataFamily} options={CHART_OPTIONS} />
                </div>
              </div>
            )}
            {filterHealth() && (
              <div className="chart-wrapper">
                <div className="chart-title">
                  <h2>Health</h2>
                </div>
                <div className="chart">
                  <Bar data={chartDataHealth} options={CHART_OPTIONS} />
                </div>
              </div>
            )}
            {filterFreedom() && (
              <div className="chart-wrapper">
                <div className="chart-title">
                  <h2>Freedom</h2>
                </div>
                <div className="chart">
                  <Bar data={chartDataFreedom} options={CHART_OPTIONS} />
                </div>
              </div>
            )}
            {filterGenerosity() && (
              <div className="chart-wrapper">
                <div className="chart-title">
                  <h2>Generosity</h2>
                </div>
                <div className="chart">
                  <Bar data={chartDataGenerosity} options={CHART_OPTIONS} />
                </div>
              </div>
            )}
            {filterTrust() && (
              <div className="chart-wrapper">
                <div className="chart-title">
                  <h2>Trust</h2>
                </div>
                <div className="chart">
                  <Bar data={chartDataTrust} options={CHART_OPTIONS} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (props.loginState)
    return (
      <div className="hero">
        <h1>Factors</h1>
        <div className="user-control">
          <div
            className="custom-button"
            onClick={() => {
              setShowTop10(() => !showTop10);
              clearQueryCountry();
            }}
          >
            {showTop10 ? "Show All Data" : "Show Top 10 Data with Graphs"}
          </div>

          {dropdownYear.dropdownMenu()}
          {dropdownFactor.dropdownMenu()}
          {!showTop10 && <div>{dropdownCountry.dropdownMenu()}</div>}
          {!showTop10 && (
            <div
              className="custom-button"
              onClick={() => {
                clearQueryCountry();
              }}
            >
              Clear Country Filter
            </div>
          )}
        </div>
        <Content />
      </div>
    );

  return (
    <div className="hero">
      <h1>Factors</h1>
      <h2>Please Login before viewing this content.</h2>
    </div>
  );
}

function getCountries() {
  const url = "http://131.181.190.87:3000/countries";
  return fetch(url).then((res) => res.json());
}

function getFactors(queryYear, queryCountry) {
  const url = `http://131.181.190.87:3000/factors/${queryYear}?country=${queryCountry}`;
  return fetch(url, {
    headers,
  })
    .then((res) => res.json())
    .then((entries) =>
      entries.map((entry) => {
        return {
          rank: entry.rank,
          country: entry.country,
          score: entry.score,
          economy: entry.economy,
          family: entry.family,
          health: entry.health,
          freedom: entry.freedom,
          generosity: entry.generosity,
          trust: entry.trust,
        };
      })
    );
}

function getFactorsLimit(queryYear) {
  const url = `http://131.181.190.87:3000/factors/${queryYear}?limit=10`;
  return fetch(url, {
    headers,
  })
    .then((res) => res.json())
    .then((entries) =>
      entries.map((entry) => {
        return {
          rank: entry.rank,
          country: entry.country,
          score: entry.score,
          economy: entry.economy,
          family: entry.family,
          health: entry.health,
          freedom: entry.freedom,
          generosity: entry.generosity,
          trust: entry.trust,
        };
      })
    );
}

function getChartData(entries) {
  let labels = [];
  let dataEconomy = [];
  let dataFamily = [];
  let dataHealth = [];
  let dataFreedom = [];
  let dataGenerosity = [];
  let dataTrust = [];
  entries.forEach((entry) => {
    labels.push(entry.country);
    dataEconomy.push(entry.economy);
    dataFamily.push(entry.family);
    dataHealth.push(entry.health);
    dataFreedom.push(entry.freedom);
    dataGenerosity.push(entry.generosity);
    dataTrust.push(entry.trust);
  });
  return [
    {
      labels: labels,
      data: dataEconomy,
    },
    {
      labels: labels,
      data: dataFamily,
    },
    {
      labels: labels,
      data: dataHealth,
    },
    {
      labels: labels,
      data: dataFreedom,
    },
    {
      labels: labels,
      data: dataGenerosity,
    },
    {
      labels: labels,
      data: dataTrust,
    },
  ];
}
