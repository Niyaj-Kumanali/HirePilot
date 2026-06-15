export const endpoints = {

    // Auth
    signUp: '/auth/signup',
    signIn: '/auth/signin',
    currentUser: '/auth/me',

    // Jobs
    jobs: '/jobs',
    jobById: '/jobs/:id',

    //Interviews
    interviews: '/interviews',
    interviewById: '/interviews/:id',
    startSession: '/interviews/start',
    submitPerformance: '/interviews/submit',

    // Resume
    resumeUpload: '/resume/upload',
    resume: '/resume',

    // Emails
    emailGenerate: '/emails/generate',
    emailSend: '/emails/send',
    emailHistory: '/emails/history',

    // Hiring Manager Campaign
    hmUpload: '/hiring-managers/upload',
    hmList: '/hiring-managers',
    hmGenerate: '/hiring-managers/generate',
    hmGenerateAll: '/hiring-managers/generate-all',
    hmSend: '/hiring-managers/send',
    hmSendAll: '/hiring-managers/send-all',
    hmConfirmResend: '/hiring-managers/confirm-resend',
}