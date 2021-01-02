import React, { useState } from "react";
import SearchInput from "../../components/Search/SearchInput/SearchInput";
import SearchResultsList from "../../components/Search/SearchResultsList/SearchResultsList";
import useUsersUpdater, {
  IUseUpdateUsersOutput as IUseUsersUpdaterOutput,
} from "../../hooks/useUsersUpdater";

import "./SearchPage.scss";

export default function SearchPage() {
  const {
    pageState,
    submittedUserState: [submittedUser, setSubmittedUser],
    users,
    loading,
    error,
    hasMore,
  }: IUseUsersUpdaterOutput = useUsersUpdater();

  return (
    <div className="search-page">
      <SearchInput setSubmittedUser={setSubmittedUser} />
      <SearchResultsList
        {...{ users, loading, error, submittedUser, hasMore, pageState }}
      />
    </div>
  );
}
