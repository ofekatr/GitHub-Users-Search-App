import { useState, useEffect } from "react";
import githubUsersEndpoint from "../services/github-users.service";

export interface IUseUpdateUsersOutput {
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  submittedUserState: [string, React.Dispatch<React.SetStateAction<string>>];
  users: string[];
  loading: boolean;
  error: boolean;
}

export default function useUsersUpdater() {
  const [submittedUser, setSubmittedUser] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(new Array<string>());

  const { getUsers } = githubUsersEndpoint();

  useEffect(() => {
    if (submittedUser === "") return;
    setLoading(true);
    const updateUsers = async () => {
      try {
        const newUsers = await getUsers(submittedUser, page);
        setUsers((prevUsers: string[]) => [
          ...prevUsers,
          ...newUsers.data.items.map((item: { login: string }) => item.login),
        ]);
      } catch (e) {
        setError(true);
      }
    };
    updateUsers();
  }, [page]);

  useEffect(() => {
    setUsers([]);
    setPage(1);
  }, [submittedUser]);

  return {
    pageState: [page, setPage],
    submittedUserState: [submittedUser, setSubmittedUser],
    users,
    loading,
    error,
  } as IUseUpdateUsersOutput;
}
