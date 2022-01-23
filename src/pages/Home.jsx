import React from "react";

export default function Home() {
  return (
    <div className="hero">
      <h1>Welcome to The Happiness!</h1>
      <div className="main-content">
        <div className="home-content">
          <h2>World happiness data from displayed in filterable tables!</h2>
          <div className="text-container">
            The database contains the Happiness Data of all countries. For
            better user access, the data are presented in a sortable Data, so
            you can find the exact data you want with ease!
          </div>
          <div className="image-container">
            <img src="/images/home1.png" alt="" width="100%" />
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="home-content">
          <h2>Data presented in charts!</h2>
          <div className="text-container">
            Sometimes, comparing numbers is not the easiest thing to do. Some
            data are presents in charts for easier data comparison!
          </div>
          <div className="image-container">
            <img src="/images/home2.png" alt="" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
