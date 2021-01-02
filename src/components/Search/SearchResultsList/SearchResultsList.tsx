import React, { useCallback, useRef } from "react";
import SearchResult from "../SearchResult/SearchResult";

interface ISearchResultsProps {
  users;
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
  loading,
  error,
  hasMore,
  submittedUser,
  pageState: [page, setPage],
}: ISearchResultsProps) {
  const { pageNumber } = page;
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

  return (
    <>
      <div>
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
      <div>{loading && submittedUser && "Loading..."}</div>
      <div>{error && "Error."}</div>
    </>
  );
}
