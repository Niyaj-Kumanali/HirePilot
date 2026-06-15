import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { RESUME_SERVICE } from '../../api/services/resumeApi';

interface ResumeUploadProps {
  onUploadSuccess?: () => void;
}

const ResumeUpload = ({ onUploadSuccess }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selected);
      setError('');
      setSuccess('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    setSuccess('');
    try {
      await RESUME_SERVICE.uploadResume(file);
      setSuccess('Resume uploaded successfully!');
      setFile(null);
      onUploadSuccess?.();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={20} className="text-primary" />
        <h3 className="text-base font-extrabold text-[#202124] dark:text-[#e8eaed]">Resume</h3>
      </div>

      <div className="space-y-3">
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-white/60 dark:border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {file ? file.name : 'Click to upload your resume'}
          </p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX or TXT (max 10MB)</p>
        </div>

        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-button hover:shadow-card-hover transition-all disabled:opacity-50"
          >
            {uploading ? (
              <><Loader size={16} className="animate-spin" /> Uploading...</>
            ) : (
              <><Upload size={16} /> Upload</>
            )}
          </button>
        )}

        {error && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 text-sm font-semibold">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-sm font-semibold">
            <CheckCircle size={16} />
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
