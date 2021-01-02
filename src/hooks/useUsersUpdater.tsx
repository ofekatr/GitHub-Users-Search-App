import { useState, useEffect } from "react";
import githubUsersEndpoint from "../services/github-users.service";

export interface IUseUpdateUsersOutput {
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  submittedUserState: [string, React.Dispatch<React.SetStateAction<string>>];
  users: string[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
}

export default function useUsersUpdater() {
  const [submittedUser, setSubmittedUser] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState(new Array<string>());

  const { getUsers } = githubUsersEndpoint();

  useEffect(() => {
    if (submittedUser === "") return;
    const updateUsers = async () => {
      try {
        setLoading(true);
        const newUsers = (await getUsers(submittedUser, page)).data.items;
        setUsers((prevUsers: string[]) => [
          ...(page > 1 ? prevUsers : []),
          ...newUsers.map((item: { login: string }) => item.login),
        ]);
        setLoading(false);
        setHasMore(newUsers.length > 0);
      } catch (e) {
        setError(true);
      }
    };
    updateUsers();
  }, [page, submittedUser]);

  return {
    pageState: [page, setPage],
    submittedUserState: [submittedUser, setSubmittedUser],
    users,
    loading,
    error,
    hasMore,
  } as IUseUpdateUsersOutput;
}
