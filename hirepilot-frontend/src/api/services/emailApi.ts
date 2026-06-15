import { API } from '../API';
import { endpoints } from '../globalEndpoint';

export interface EmailGenerateRequest {
    jobTitle: string;
    jobCompany: string;
    hiringManagerName: string;
    userSkills?: string;
    userExperience?: string;
}

export interface EmailGenerateResponse {
    subject: string;
    body: string;
}

export interface EmailSendRequest {
    toEmail: string;
    toName: string;
    subject: string;
    body: string;
    jobTitle: string;
    jobCompany: string;
    jobLocation?: string;
}

export interface EmailSendResponse {
    id: number;
    status: string;
    message: string;
}

export interface EmailHistoryItem {
    id: number;
    toEmail: string;
    toName: string;
    subject: string;
    body: string;
    jobTitle: string;
    jobCompany: string;
    status: string;
    sentAt: string;
}

export const EMAIL_SERVICE = {
    generateEmail: async (req: EmailGenerateRequest): Promise<EmailGenerateResponse> => {
        const response = await API.post(endpoints.emailGenerate, req);
        return response.data;
    },
    sendEmail: async (req: EmailSendRequest): Promise<EmailSendResponse> => {
        const response = await API.post(endpoints.emailSend, req);
        return response.data;
    },
    getEmailHistory: async (): Promise<EmailHistoryItem[]> => {
        const response = await API.get(endpoints.emailHistory);
        return response.data;
    },
};
