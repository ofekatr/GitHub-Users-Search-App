import React, { useState } from "react";
import SearchInput from "../../components/Search/SearchInput/SearchInput";
import SearchResultsList from "../../components/Search/SearchResultsList/SearchResultsList";
import useUsersUpdater, {
  IUseUsersUpdaterOutput as IUseUsersUpdaterOutput,
} from "../../hooks/useUsersUpdater";

import "./SearchPage.scss";

/**
 * @description Search page. Route: /search
 */
export default function SearchPage() {
  const {
    pageState,
    submittedUserState: [submittedUser, setSubmittedUser],
    users,
    loading,
    error,
    hasMore,
    totalCount,
  }: IUseUsersUpdaterOutput = useUsersUpdater();

  return (
    <div className="search-page">
      <div className="search-input-container">
        <SearchInput setSubmittedUser={setSubmittedUser} />
      </div>
      <SearchResultsList
        {...{ users, totalCount, loading, error, submittedUser, hasMore, pageState }}
      />
    </div>
  );
}
