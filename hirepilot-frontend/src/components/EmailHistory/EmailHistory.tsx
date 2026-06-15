import { useState, useEffect } from 'react';
import { Mail, CheckCircle, XCircle, Loader, Clock } from 'lucide-react';
import { EMAIL_SERVICE } from '../../api/services/emailApi';
import type { EmailHistoryItem } from '../../api/services/emailApi';

const EmailHistory = () => {
  const [emails, setEmails] = useState<EmailHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EMAIL_SERVICE.getEmailHistory()
      .then(setEmails)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail size={20} className="text-primary" />
          <h3 className="text-base font-extrabold text-[#202124] dark:text-[#e8eaed]">Sent Emails</h3>
        </div>
        <div className="flex justify-center py-4">
          <Loader size={20} className="text-gray-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-4 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Mail size={20} className="text-primary" />
          <h3 className="text-base font-extrabold text-[#202124] dark:text-[#e8eaed]">Sent Emails</h3>
        </div>
        <div className="flex flex-col items-center gap-2 py-6 text-gray-400">
          <Mail size={28} className="opacity-50" />
          <p className="text-sm font-semibold">No emails sent yet</p>
          <p className="text-xs">Cold emails you send will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail size={20} className="text-primary" />
        <h3 className="text-base font-extrabold text-[#202124] dark:text-[#e8eaed]">Sent Emails</h3>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary ml-auto">{emails.length}</span>
      </div>
      <div className="space-y-2">
        {emails.map((email) => (
          <div
            key={email.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all border border-transparent hover:border-white/60 dark:hover:border-white/10"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${email.status === 'SENT' ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
              {email.status === 'SENT' ? <CheckCircle size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-red-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#202124] dark:text-[#e8eaed] truncate">{email.toEmail}</span>
                <span className="text-[0.6rem] font-semibold text-gray-400 flex items-center gap-1 flex-shrink-0">
                  <Clock size={10} />
                  {email.sentAt ? new Date(email.sentAt).toLocaleDateString() : ''}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{email.subject}</p>
              {email.jobTitle && (
                <p className="text-[0.65rem] text-primary/70 font-semibold mt-0.5">
                  {email.jobTitle} @ {email.jobCompany}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailHistory;
