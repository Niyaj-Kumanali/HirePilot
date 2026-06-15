import { API, UPLOAD_API } from '../API';
import { endpoints } from '../globalEndpoint';

export interface HiringManagerRow {
    id: number;
    name: string;
    email: string;
    company: string;
    jobTitle: string;
    jobLocation: string;
    generatedSubject: string | null;
    generatedBody: string | null;
    status: string;
    sentAt: string | null;
    sendCount: number;
    resendConfirmed: boolean;
    duplicate: boolean;
}

export interface UploadResponse {
    totalRows: number;
    duplicates: number;
    newRows: number;
    rows: HiringManagerRow[];
    message: string;
}

export interface BatchActionResponse {
    successCount: number;
    failCount: number;
    message: string;
}

export const HIRING_MANAGER_SERVICE = {
    uploadExcel: async (file: File): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await UPLOAD_API.post(endpoints.hmUpload, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
    getAll: async (): Promise<HiringManagerRow[]> => {
        const response = await API.get(endpoints.hmList);
        return response.data;
    },
    generateEmail: async (managerId: number): Promise<HiringManagerRow> => {
        const response = await API.post(endpoints.hmGenerate, { managerId });
        return response.data;
    },
    generateAll: async (): Promise<BatchActionResponse> => {
        const response = await API.post(endpoints.hmGenerateAll);
        return response.data;
    },
    sendEmails: async (managerIds: number[]): Promise<BatchActionResponse> => {
        const response = await API.post(endpoints.hmSend, { managerIds });
        return response.data;
    },
    sendAll: async (): Promise<BatchActionResponse> => {
        const response = await API.post(endpoints.hmSendAll);
        return response.data;
    },
    confirmResend: async (managerId: number, confirmed: boolean) => {
        const response = await API.post(endpoints.hmConfirmResend, { managerId, confirmed });
        return response.data;
    },
};
