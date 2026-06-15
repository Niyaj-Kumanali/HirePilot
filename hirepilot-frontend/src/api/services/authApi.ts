import { API } from "../API";
import { endpoints } from "../globalEndpoint";

export const AUTH_SERVICE = {
    login: async (credentials: Record<string, unknown>) => {
        const response = await API.post(endpoints.signIn, credentials);
        return response.data;
    },
    register: async (userData: Record<string, unknown>) => {
        const response = await API.post(endpoints.signUp, userData);
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await API.get(endpoints.currentUser);
        return response.data;
    }
}