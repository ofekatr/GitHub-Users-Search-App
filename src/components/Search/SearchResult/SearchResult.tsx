import React from "react";

export default function SearchResult({
  user: { login, email, bio, avatar_url },
}) {
  return (
    <div className="search-result-container">
      <div className="image-container">
        <img src={avatar_url} alt="avatar" />
      </div>
      <p>{login}</p>
      {email && <p>{email}</p>}
      {bio && <p>{bio}</p>}
    </div>
  );
}
