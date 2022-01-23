import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav>
      {props.loginState ? (
        <ul>
          <li>
            <Link to="./">Home</Link>
          </li>
          <li>
            <Link to="./rankings">Rankings</Link>
          </li>
          <li>
            <Link to="./search">Search</Link>
          </li>
          <li>
            <Link to="./factors">Factors</Link>
          </li>
          <li>
            <Link to="./logout">Logout</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="./">Home</Link>
          </li>
          <li>
            <Link to="./rankings">Rankings</Link>
          </li>
          <li>
            <Link to="./search">Search</Link>
          </li>
          <li>
            <Link to="./factors">Factors</Link>
          </li>
          <li>
            <Link to="./register">Register</Link>
          </li>
          <li>
            <Link to="./login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
