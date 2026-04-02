import { delay } from '../mockUtils';
import { jobList } from '../../data/jobs';
// import { API } from '../API';
// import { endpoints } from '../globalEndpoint';

export const JOB_SERVICE = {
    getJobs: async (filters?: Record<string, unknown>) => {
        // Real API Call (Commented out)
        /*
        const response = await API.get(endpoints.jobs, { params: filters });
        return response.data
        */

        // Mock Implementation
        await delay(1000);
        let jobs = [...jobList];

        if (filters) {
            if (filters.type) {
                jobs = jobs.filter(j => j.type === filters.type);
            }
            if (filters.level) {
                jobs = jobs.filter(j => j.level === filters.level);
            }
            if (filters.location) {
                jobs = jobs.filter(j => j.location === filters.location);
            }
        }

        return jobs;
    },
    getJobById: async (id: string | number) => {
        // Real API Call (Commented out)
        /*
        const response = await API.get(`${endpoints.jobs}/${id}`);
        return response.data
        */

        // Mock Implementation
        await delay(400);
        return jobList.find(j => j.id.toString() === id.toString());
    },
    createJob: async (job: Record<string, unknown>) => {
        // Real API Call (Commented out)
        /*
        const response = await API.post(endpoints.jobs, job);
        return response.data
        */

        // Mock Implementation
        await delay(800);
        return { ...job, id: Date.now() };
    },
    updateJob: async (id: string, job: Record<string, unknown>) => {
        // Real API Call (Commented out)
        /*
        const response = await API.put(`${endpoints.jobs}/${id}`, job);
        return response.data
        */

        // Mock Implementation
        await delay(800);
        return { ...job, id };
    },
    deleteJob: async (id: string) => {
        // Real API Call (Commented out)
        /*
        const response = await API.delete(`${endpoints.jobs}/${id}`);
        return response.data
        */

        // Mock Implementation
        await delay(600);
        return { success: true, id };
    }
}
