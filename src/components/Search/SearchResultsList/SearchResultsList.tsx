import React, { useCallback, useRef } from "react";

interface ISearchResultsProps {
  users: string[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  submittedUser: string;
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
}

export default function SearchResults({
  users,
  loading,
  error,
  hasMore,
  submittedUser,
  pageState: [page, setPage],
}: ISearchResultsProps) {
  const observer: any = useRef();
  const lastSearchResultRef = useCallback(
    (node) => {
      if (loading || error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) {
            setPage((prevPage) => prevPage + 1);
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
                key={user}
              >
                {user}
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
