import { API, UPLOAD_API } from '../API';
import { endpoints } from '../globalEndpoint';

export const RESUME_SERVICE = {
    uploadResume: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await UPLOAD_API.post(endpoints.resumeUpload, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
    getResume: async () => {
        const response = await API.get(endpoints.resume);
        return response.data;
    },
};
