import React from "react";
import { Link } from "react-router-dom";

import "./HomePage.scss";

/**
 * @description Home page. Route: /
 */
export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to usertron!</h1>
      <img src={process.env.PUBLIC_URL + "/img/github-logo.png"} alt="github-logo" />
      <div className="search-page-link">
        <Link to="/search">
          <button>Start Searching</button>
        </Link>
      </div>
    </div>
  );
}
