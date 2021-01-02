import { useState, useEffect } from "react";
import githubUsersEndpoint from "../services/github-users.service";

export interface IUseUpdateUsersOutput {
  pageState: [
    { pageNumber: number },
    React.Dispatch<React.SetStateAction<{ pageNumber: number }>>
  ];
  submittedUserState: [string, React.Dispatch<React.SetStateAction<string>>];
  users: string[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
}

export default function useUsersUpdater() {
  const [submittedUser, setSubmittedUser] = useState("");
  const [page, setPage] = useState({ pageNumber: 1 });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState(new Array<string>());

  const { getUsers } = githubUsersEndpoint();

  useEffect(() => {
    const { pageNumber } = page;

    if (submittedUser === "") return;
    const updateUsers = async () => {
      console.log(page);
      try {
        setLoading(true);
        const newUsers = (await getUsers(submittedUser, pageNumber)).data.items;
        setUsers((prevUsers: string[]) => [
          ...(pageNumber > 1 ? prevUsers : []),
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

  useEffect(() => {
    setPage({ pageNumber: 1 });
  }, [submittedUser]);

  return {
    pageState: [page, setPage],
    submittedUserState: [submittedUser, setSubmittedUser],
    users,
    loading,
    error,
    hasMore,
  } as IUseUpdateUsersOutput;
}
