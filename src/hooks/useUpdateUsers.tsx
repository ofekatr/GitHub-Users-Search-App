import { useState, useEffect } from "react";
import githubUsersEndpoint from "../services/github-users.service";

export default function useUpdateUsers(
  i_User: string,
  i_Page: number,
  i_Limit: number
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(new Array<string>());

  const { getUsers } = githubUsersEndpoint();

  useEffect(() => {
    setLoading(true);
    const updateUsers = async () => {
      try {
        const newUsers = await getUsers(i_User, i_Page);
        setUsers((prevUsers: string[]) => [
          ...prevUsers,
          ...newUsers.data.items.map((item: { login: string }) => item.login),
        ]);
      } catch (e) {
        setError(true);
      }
    };
    updateUsers();
  }, [i_Page, i_Limit]);

  return { users, loading, hasMore, error };
}
