import React from "react";
import Nav from "./Nav";

export default function Header(props) {
  return (
    <header>
      <div id="icon">The Happiness</div>
      <Nav loginState={props.loginState} />
    </header>
  );
}
