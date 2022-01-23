// import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

import React, { useState } from "react";

import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import Search from "./pages/Search";
import Factors from "./pages/Factors";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

export default function App() {
  const [loginState, setLoginState] = useState(false);
  return (
    <Router>
      <div className="App">
        <Header loginState={loginState} />

        <Switch>
          <Route path="/rankings">
            <Rankings />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/factors">
            <Factors loginState={loginState} />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/login">
            <Login loginState={loginState} setLoginState={setLoginState} />
          </Route>
          <Route path="/Logout">
            <Logout loginState={loginState} setLoginState={setLoginState} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
