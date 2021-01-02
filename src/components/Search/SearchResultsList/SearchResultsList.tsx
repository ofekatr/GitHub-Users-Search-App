import React from "react";

interface ISearchResultsProps {
  users: string[];
  loading: boolean;
  error: boolean;
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
}

export default function SearchResults({
  users,
  loading,
  error,
  pageState,
}: ISearchResultsProps) {

  console.log(users);

  return <h1>Search Results List</h1>;
}
