import { delay } from "../mockUtils";
import { completedInterviews } from "../../data/interviewData";
// import { API } from "../API";
// import { endpoints } from "../globalEndpoint";

export const INTERVIEW_SERVICE = {
    getInterviews: async () => {
        // Real API Call (Commented out)
        /*
        const response = await API.get(endpoints.interviews);
        return response.data
        */

        // Mock Implementation
        await delay(1200);
        return {
            completed: completedInterviews
        };
    },
    getInterviewById: async (id: string | number) => {
        // Real API Call (Commented out)
        /*
        const response = await API.get(`${endpoints.interviews}/${id}`);
        return response.data
        */

        // Mock Implementation
        await delay(500);
        return completedInterviews.find(i => i.id.toString() === id.toString());
    },
    createInterview: async (interview: Record<string, unknown>) => {
        // Real API Call (Commented out)
        /*
        const response = await API.post(endpoints.interviews, interview);
        return response.data
        */

        // Mock Implementation
        await delay(1000);
        return { ...interview, id: Date.now() };
    },
    updateInterview: async (id: string, interview: Record<string, unknown>) => {
        // Real API Call (Commented out)
        /*
        const response = await API.put(`${endpoints.interviews}/${id}`, interview);
        return response.data
        */

        // Mock Implementation
        await delay(800);
        return { ...interview, id };
    },
    deleteInterview: async (id: string) => {
        // Real API Call (Commented out)
        /*
        const response = await API.delete(`${endpoints.interviews}/${id}`);
        return response.data
        */

        // Mock Implementation
        await delay(700);
        return { success: true, id };
    }
}