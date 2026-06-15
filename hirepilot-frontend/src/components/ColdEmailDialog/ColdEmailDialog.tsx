import { useState } from 'react';
import { X, Send, Sparkles, Loader, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { EMAIL_SERVICE } from '../../api/services/emailApi';
import type { EmailSendResponse } from '../../api/services/emailApi';

interface ColdEmailDialogProps {
  jobTitle: string;
  jobCompany: string;
  jobLocation?: string;
  onClose: () => void;
}

type Step = 'form' | 'generating' | 'review' | 'sending' | 'done' | 'error';

const ColdEmailDialog = ({ jobTitle, jobCompany, jobLocation, onClose }: ColdEmailDialogProps) => {
  const [step, setStep] = useState<Step>('form');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [sendResult, setSendResult] = useState<EmailSendResponse | null>(null);
  const [error, setError] = useState('');
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');

  const handleGenerate = async () => {
    if (!managerName.trim() || !managerEmail.trim()) {
      setError('Please fill in both name and email');
      return;
    }
    setStep('generating');
    setError('');
    try {
      const result = await EMAIL_SERVICE.generateEmail({
        jobTitle,
        jobCompany,
        hiringManagerName: managerName,
      });
      setEditedSubject(result.subject);
      setEditedBody(result.body);
      setStep('review');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Generation failed';
      setError(msg);
      setStep('error');
    }
  };

  const handleSend = async () => {
    setStep('sending');
    setError('');
    try {
      const result = await EMAIL_SERVICE.sendEmail({
        toEmail: managerEmail,
        toName: managerName,
        subject: editedSubject,
        body: editedBody,
        jobTitle,
        jobCompany,
        jobLocation: jobLocation || '',
      });
      setSendResult(result);
      setStep('done');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Send failed';
      setError(msg);
      setStep('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={step === 'done' ? undefined : onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px] border border-white/60 dark:border-white/10 bg-white/95 dark:bg-[#1a1d23]/95 backdrop-blur-xl shadow-modal p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {step === 'review' && (
              <button onClick={() => setStep('form')} className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                <ArrowLeft size={18} className="text-gray-400" />
              </button>
            )}
            <h2 className="text-lg font-extrabold text-[#202124] dark:text-[#e8eaed]">
              {step === 'done' ? 'Email Sent' : step === 'review' ? 'Review Email' : 'Cold Email'}
            </h2>
          </div>
          {step !== 'done' && (
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all">
              <X size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Form Step */}
        {step === 'form' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10 text-sm text-primary font-semibold">
              <Sparkles size={16} />
              AI will write a personalized cold email based on your profile
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Hiring Manager Name</label>
              <input
                type="text"
                value={managerName}
                onChange={e => setManagerName(e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full px-3 py-2.5 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-[#202124] dark:text-[#e8eaed] placeholder:text-gray-400 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Hiring Manager Email</label>
              <input
                type="email"
                value={managerEmail}
                onChange={e => setManagerEmail(e.target.value)}
                placeholder="e.g. john@company.com"
                className="w-full px-3 py-2.5 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-[#202124] dark:text-[#e8eaed] placeholder:text-gray-400 transition-all"
              />
            </div>
            <div className="text-xs text-gray-400 bg-primary/3 rounded-xl px-3 py-2">
              <strong>Job:</strong> {jobTitle} @ {jobCompany}
            </div>
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 text-sm font-semibold">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-button hover:shadow-card-hover transition-all"
            >
              <Sparkles size={16} />
              Generate Email with AI
            </button>
          </div>
        )}

        {/* Generating Step */}
        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <Loader size={32} className="text-primary animate-spin" />
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Generating personalized email...</p>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 block">To</label>
              <input
                type="text"
                value={`${managerName} <${managerEmail}>`}
                disabled
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#2a2d35] border border-white/60 dark:border-white/10 text-sm text-gray-500 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Subject</label>
              <input
                type="text"
                value={editedSubject}
                onChange={e => setEditedSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-[#202124] dark:text-[#e8eaed] transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Body</label>
              <textarea
                value={editedBody}
                onChange={e => setEditedBody(e.target.value)}
                rows={12}
                className="w-full px-3 py-2.5 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-[#202124] dark:text-[#e8eaed] resize-y leading-relaxed transition-all"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 text-sm font-semibold">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <button
              onClick={handleSend}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-button hover:shadow-card-hover transition-all"
            >
              <Send size={16} />
              Send Email
            </button>
          </div>
        )}

        {/* Sending Step */}
        {step === 'sending' && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <Loader size={32} className="text-primary animate-spin" />
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Sending email...</p>
          </div>
        )}

        {/* Done Step */}
        {step === 'done' && sendResult && (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle size={36} className="text-emerald-500" />
            </div>
            <p className="text-lg font-extrabold text-[#202124] dark:text-[#e8eaed]">Email Sent!</p>
            <p className="text-sm text-gray-500 text-center">
              Your cold email was sent to <strong>{managerEmail}</strong>
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-button hover:shadow-card-hover transition-all mt-2"
            >
              Done
            </button>
          </div>
        )}

        {/* Error Step */}
        {step === 'error' && (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
              <AlertCircle size={36} className="text-red-500" />
            </div>
            <p className="text-lg font-extrabold text-[#202124] dark:text-[#e8eaed]">Something went wrong</p>
            <p className="text-sm text-gray-500 text-center">{error}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setStep('form')} className="px-4 py-2 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 border border-white/60 dark:border-white/10 text-sm font-bold shadow-button hover:shadow-card-hover transition-all">
                Go Back
              </button>
              <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColdEmailDialog;
