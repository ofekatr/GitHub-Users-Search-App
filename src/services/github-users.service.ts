import axios from "axios";

export default function githubUsersEndpoint() {
    const endpoint = axios.create({
        baseURL: "https://api.github.com/search",
    });

    const getUsers = async (i_User: string, page: number = 1) => {
        return await endpoint.get(`/users?q=${i_User} in:user&page=${page}`);
    }

    return { getUsers };
}