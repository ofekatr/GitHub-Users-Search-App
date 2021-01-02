import axios from "axios";

import config from "../config/config.json";

export default function githubUsersEndpoint() {
    const {githubSearch: githubSearchUrl } = config.urls;
    const limit = 10;
    const endpoint = axios.create({
        baseURL: githubSearchUrl,
    });

    const getUsers = async (i_User: string, page: number = 1) => {
        console.log("ACCESSING");
        return await endpoint.get(`/users?q=${i_User} in:user&page=${page}&per_page=${limit}`);
    }

    return { getUsers };
}