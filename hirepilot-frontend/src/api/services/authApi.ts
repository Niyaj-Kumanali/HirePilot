import { delay } from "../mockUtils";
import { currentUser } from "../../data/userData";
// import { API } from "../API";
// import { endpoints } from "../globalEndpoint";

export const AUTH_SERVICE = {
    login: async (credentials: Record<string, unknown>) => {
        // Real API Call (Commented out)
        /*
        const response = await API.post(endpoints.signIn, credentials);
        return response.data
        */

        // Mock Implementation
        await delay(800);
        console.log('Mock Login:', credentials);
        if (credentials.email === 'iamnawazahmad777@gmail.com' && credentials.password === 'password') {
            return {
                user: currentUser,
                token: 'mock-jwt-token'
            };
        }
        throw new Error('Invalid credentials');
    },
    register: async (userData: Record<string, unknown>) => {
        // Real API Call (Commented out)
        /*
        const response = await API.post(endpoints.signUp, userData);
        return response.data
        */


        // Mock Implementation
        await delay(1000);
        console.log('Mock Register:', userData);

        if(userData.email === 'iamnawazahmad777@gmail.com'){
            throw new Error('User already exists');
        }
        return {
            user: { ...currentUser, ...userData },
            token: 'mock-jwt-token'
        };
    },
    getCurrentUser: async () => {
        // Real API Call (Commented out)
        /*
        const response = await API.get(endpoints.currentUser);
        return response.data
        */

        // Mock Implementation
        await delay(500);
        return currentUser;
    }
}