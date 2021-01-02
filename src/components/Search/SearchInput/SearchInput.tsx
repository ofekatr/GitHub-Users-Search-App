import React from "react";

interface ISearchInputProps {
    setSubmittedUser: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchInput({ setSubmittedUser }) {
  return (
    <div>
      <h1>Search Input</h1>
    </div>
  );
}
