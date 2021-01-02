import React from "react";

import "./SearchResult.scss";

export default function SearchResult({
  user: { login, email, bio, avatar_url, html_url },
}) {
  return (
      <a href={html_url} target="_blank">
        <div className="search-result-container">
          <div className="image-container">
            <img src={avatar_url} alt="avatar" />
          </div>
          <div className="login-container">
            <p className="login">{login}</p>
          </div>
          {email && (
            <div className="email-container">
              <p className="email">{email}</p>
            </div>
          )}
          {bio && (
            <div className="bio-container">
              <p className="bio">{bio}</p>
            </div>
          )}
        </div>
      </a>
  );
}
