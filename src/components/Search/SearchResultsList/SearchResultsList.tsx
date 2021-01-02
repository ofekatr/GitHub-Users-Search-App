import React, { useCallback, useRef } from "react";

import SearchResult from "../SearchResult/SearchResult";
import "./SearchResultsList.scss";

interface ISearchResultsProps {
  users;
  totalCount: number;
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  submittedUser: string;
  pageState: [
    { pageNumber: number },
    React.Dispatch<React.SetStateAction<{ pageNumber: number }>>
  ];
}

export default function SearchResults({
  users,
  totalCount,
  loading,
  error,
  hasMore,
  submittedUser,
  pageState: [, setPage],
}: ISearchResultsProps) {
  const observer: any = useRef();
  const lastSearchResultRef = useCallback(
    (node) => {
      if (loading || error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) {
            setPage(({ pageNumber: prevPageNumber }) => ({
              pageNumber: prevPageNumber + 1,
            }));
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, error]
  );

  const shouldDisplayLoading = () => loading && submittedUser && !error;
  const shouldDisplayTotalCount = () => totalCount > -1;

  return (
    <div className="list-container">
      {shouldDisplayTotalCount() && (
        <div className="total-count-container">{`${totalCount} user(s) found`}</div>
      )}
      <div className="users-list">
        {users && (
          <ul>
            {users.map((user, i) => (
              <li
                ref={i === users.length - 1 ? lastSearchResultRef : null}
                key={user.id}
              >
                <SearchResult user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>{shouldDisplayLoading() && "Loading..."}</div>
      <div>{error && "Error."}</div>
    </div>
  );
}
