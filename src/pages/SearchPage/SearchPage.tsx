import React, { useState } from "react";
import SearchInput from "../../components/Search/SearchInput/SearchInput";
import SearchResultsList from "../../components/Search/SearchResultsList/SearchResultsList";
import useUsersUpdater, {
  IUseUpdateUsersOutput as IUseUsersUpdaterOutput,
} from "../../hooks/useUsersUpdater";

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
    <>
      <SearchInput setSubmittedUser={setSubmittedUser} />
      <SearchResultsList {...{ users, loading, error, submittedUser, hasMore, pageState }} />
    </>
  );
}
