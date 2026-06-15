import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
    Download, Upload, FileSpreadsheet, Mail, Send, Sparkles, Loader,
    CheckCircle, XCircle, AlertCircle, RefreshCw, UserCheck, UserX,
    Eye, ChevronUp, AlertTriangle
} from 'lucide-react';
import VisualHeader from '../../components/ui/VisualHeader';
import ResumeUpload from '../../components/ResumeUpload/ResumeUpload';
import { RESUME_SERVICE } from '../../api/services/resumeApi';
import { HIRING_MANAGER_SERVICE } from '../../api/services/hiringManagerApi';
import type { HiringManagerRow } from '../../api/services/hiringManagerApi';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    PENDING:    { label: 'Pending',    color: 'text-gray-500',  bg: 'bg-gray-100 dark:bg-gray-500/10' },
    GENERATED:  { label: 'Generated',  color: 'text-blue-600',  bg: 'bg-blue-50 dark:bg-blue-500/10' },
    SENT:       { label: 'Sent',       color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    FAILED:     { label: 'Failed',     color: 'text-red-600',   bg: 'bg-red-50 dark:bg-red-500/10' },
    DUPLICATE:  { label: 'Duplicate',  color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
};

const ColdEmailCampaign = () => {
    const [rows, setRows] = useState<HiringManagerRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [generatingId, setGeneratingId] = useState<number | null>(null);
    const [generatingAll, setGeneratingAll] = useState(false);
    const [sendingId, setSendingId] = useState<number | null>(null);
    const [sendingAll, setSendingAll] = useState(false);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [editingSubject, setEditingSubject] = useState<Record<number, string>>({});
    const [editingBody, setEditingBody] = useState<Record<number, string>>({});
    const [uploadMsg, setUploadMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; data: string[][] } | null>(null);
    const [hasResume, setHasResume] = useState(false);
    const [resumeChecking, setResumeChecking] = useState(true);
    const [showResendModal, setShowResendModal] = useState(false);
    const [modalAction, setModalAction] = useState<() => void>(() => {});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { loadRows(); }, []);

    useEffect(() => {
        RESUME_SERVICE.getResume()
            .then((res) => setHasResume(!!res.parsedResume))
            .catch(() => {})
            .finally(() => setResumeChecking(false));
    }, []);

    const loadRows = async () => {
        setLoading(true);
        try {
            const data = await HIRING_MANAGER_SERVICE.getAll();
            setRows(data);
        } catch { /* ignore */ }
        setLoading(false);
    };

    const handleDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
        ['Hiring Manager Name', 'Hiring Manager Email', 'Company Name', 'Job Title', 'Job Location'],
        ['Niyaz Ahmad', 'www.niyazkumanali@gmail.com', 'TalentPace', 'Software Engineer', 'Bengaluru, India'],
    ]);
    ws['!cols'] = [{ wch: 22 }, { wch: 30 }, { wch: 18 }, { wch: 28 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Hiring Managers');
    XLSX.writeFile(wb, 'hiring_manager_template.xlsx');
};

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadMsg(null);
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const wb = XLSX.read(evt.target?.result, { type: 'binary' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
                const sizeStr = file.size > 1024 * 1024
                    ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
                    : (file.size / 1024).toFixed(1) + ' KB';
                setSelectedFile({ name: file.name, size: sizeStr, data: json.slice(0, 6) });
            } catch {
                setSelectedFile(null);
                setUploadMsg({ type: 'error', text: 'Failed to read Excel file' });
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleUpload = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) return;
        setUploading(true);
        setUploadMsg(null);
        try {
            const result = await HIRING_MANAGER_SERVICE.uploadExcel(file);
            setRows(result.rows);
            setSelectedFile(null);
            setUploadMsg({ type: 'success', text: result.message });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Upload failed';
            setUploadMsg({ type: 'error', text: msg });
        }
        setUploading(false);
        if (fileInputRef.current) { fileInputRef.current.value = ''; }
    };

    const toggleSelect = (id: number) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selected.size === rows.length) setSelected(new Set());
        else setSelected(new Set(rows.map(r => r.id)));
    };

    const handleGenerateOne = async (id: number) => {
        setGeneratingId(id);
        try {
            const updated = await HIRING_MANAGER_SERVICE.generateEmail(id);
            setRows(prev => prev.map(r => r.id === id ? updated : r));
            setEditingSubject(prev => ({ ...prev, [id]: updated.generatedSubject || '' }));
            setEditingBody(prev => ({ ...prev, [id]: updated.generatedBody || '' }));
        } catch { /* ignore */ }
        setGeneratingId(null);
    };

    const handleGenerateAll = async () => {
        setGeneratingAll(true);
        await HIRING_MANAGER_SERVICE.generateAll();
        await loadRows();
        setGeneratingAll(false);
    };

    const handleSendOne = async (id: number) => {
        const row = rows.find(r => r.id === id);
        if (!row) return;
        if (row.sendCount > 1) return;
        if (row.sendCount > 0 && !row.resendConfirmed) return;
        setSendingId(id);
        try {
            await HIRING_MANAGER_SERVICE.sendEmails([id]);
            await loadRows();
        } catch { /* ignore */ }
        setSendingId(null);
    };

    const doSendSelected = async () => {
        if (selected.size === 0) return;
        setSendingAll(true);
        try {
            await HIRING_MANAGER_SERVICE.sendEmails(Array.from(selected));
            await loadRows();
            setSelected(new Set());
        } catch { /* ignore */ }
        setSendingAll(false);
    };

    const handleSendSelected = () => {
        const hasSent = rows.some(r => selected.has(r.id) && r.sendCount > 0);
        if (hasSent) {
            setModalAction(() => doSendSelected);
            setShowResendModal(true);
        } else {
            doSendSelected();
        }
    };

    const doSendAll = async () => {
        setSendingAll(true);
        try {
            await HIRING_MANAGER_SERVICE.sendAll();
            await loadRows();
        } catch { /* ignore */ }
        setSendingAll(false);
    };

    const handleSendAll = () => {
        const hasSent = rows.some(r => r.sendCount > 0);
        if (hasSent) {
            setModalAction(() => doSendAll);
            setShowResendModal(true);
        } else {
            doSendAll();
        }
    };

    const handleConfirmResend = async (id: number, confirmed: boolean) => {
        try {
            await HIRING_MANAGER_SERVICE.confirmResend(id, confirmed);
            setRows(prev => prev.map(r => r.id === id ? { ...r, resendConfirmed: confirmed } : r));
        } catch { /* ignore */ }
    };

    if (loading) {
        return (
            <div className="min-h-screen py-6 md:py-8">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="flex justify-center py-20">
                        <Loader size={28} className="text-primary animate-spin" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-6 md:py-8 relative">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="mb-6">
                    <VisualHeader
                        badge="Cold Email Campaign"
                        title="Send Personalized"
                        highlight="Cold Emails"
                        subtitle="Upload your hiring manager list, generate AI emails, and send them individually or in bulk."
                    />
                </div>

                {/* Resume + Template Download */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 mb-6">
                    <ResumeUpload onUploadSuccess={() => setHasResume(true)} />
                    <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileSpreadsheet size={20} className="text-primary" />
                            <h3 className="text-base font-extrabold text-[#202124] dark:text-[#e8eaed]">1. Download Template</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Download the Excel template, fill it with your hiring manager contacts using any AI agent (Claude, ChatGPT, Gemini), then upload it below.
                        </p>
                        <button
                            onClick={handleDownloadTemplate}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-button hover:shadow-card-hover transition-all"
                        >
                            <Download size={16} />
                            Download Template (.xlsx)
                        </button>
                        <div className="mt-3 text-xs text-gray-400 bg-primary/3 rounded-xl px-3 py-2">
                            <strong>Format:</strong> Hiring Manager Name | Email | Company | Job Title | Job Location
                        </div>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-4 md:p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Upload size={20} className="text-primary" />
                        <h3 className="text-base font-extrabold text-[#202124] dark:text-[#e8eaed]">2. Upload Your Excel File</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 border border-white/60 dark:border-white/10 text-sm font-bold shadow-button hover:shadow-card-hover transition-all disabled:opacity-50"
                        >
                            <Upload size={16} />
                            {selectedFile ? 'Change File' : 'Choose File'}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        {selectedFile && (
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-button hover:shadow-card-hover transition-all disabled:opacity-50"
                            >
                                {uploading ? <Loader size={16} className="animate-spin" /> : <Upload size={16} />}
                                {uploading ? 'Uploading...' : 'Upload to Server'}
                            </button>
                        )}
                        <span className="text-xs text-gray-400">.xlsx or .xls files only</span>
                    </div>

                    {/* File Preview */}
                    {selectedFile && (
                        <div className="mt-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-white/60 dark:border-white/10">
                            <div className="flex items-center gap-2 mb-3">
                                <FileSpreadsheet size={18} className="text-primary" />
                                <span className="text-sm font-bold text-[#202124] dark:text-[#e8eaed]">{selectedFile.name}</span>
                                <span className="text-xs text-gray-400">({selectedFile.size})</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/60 dark:border-white/10">
                                            {selectedFile.data[0]?.map((h, i) => (
                                                <th key={i} className="p-1.5 text-left font-bold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedFile.data.slice(1).map((row, ri) => (
                                            <tr key={ri} className="border-b border-black/[0.02] dark:border-white/[0.02]">
                                                {row.map((cell, ci) => (
                                                    <td key={ci} className={`p-1.5 text-[#202124] dark:text-[#e8eaed] ${ci === 1 ? 'text-blue-600 dark:text-blue-400' : ''} whitespace-nowrap`}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {selectedFile.data.length > 6 && (
                                <p className="mt-2 text-xs text-gray-400">
                                    Showing first {selectedFile.data.length - 1} of {selectedFile.data.length - 1}+ rows
                                </p>
                            )}
                        </div>
                    )}

                    {uploadMsg && (
                        <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${
                            uploadMsg.type === 'success'
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'
                                : 'bg-red-50 dark:bg-red-500/10 text-red-600'
                        }`}>
                            {uploadMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            {uploadMsg.text}
                        </div>
                    )}
                </div>

                {/* Table Section */}
                {rows.length > 0 && (
                    <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-4 md:p-6 mb-6">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <Mail size={20} className="text-primary" />
                                <h3 className="text-base font-extrabold text-[#202124] dark:text-[#e8eaed]">
                                    3. Contacts ({rows.length})
                                </h3>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <button
                                    onClick={handleGenerateAll}
                                    disabled={generatingAll}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all disabled:opacity-50"
                                >
                                    <Sparkles size={14} />
                                    {generatingAll ? 'Generating...' : 'Generate All'}
                                </button>
                                <button
                                    onClick={handleSendSelected}
                                    disabled={selected.size === 0 || sendingAll || !hasResume}
                                    title={!hasResume ? 'Upload your resume first' : ''}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all disabled:opacity-40"
                                >
                                    <Send size={14} />
                                    Send Selected ({selected.size})
                                </button>
                                <button
                                    onClick={handleSendAll}
                                    disabled={sendingAll || !hasResume}
                                    title={!hasResume ? 'Upload your resume first' : ''}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-button hover:shadow-card-hover transition-all disabled:opacity-50"
                                >
                                    <Send size={14} />
                                    {sendingAll ? 'Sending...' : 'Send All'}
                                </button>
                                <button
                                    onClick={loadRows}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-gray-500 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                                >
                                    <RefreshCw size={14} />
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                                const count = rows.filter(r => r.status === key).length;
                                if (count === 0) return null;
                                return (
                                    <div key={key} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${cfg.bg} ${cfg.color}`}>
                                        {key === 'SENT' ? <CheckCircle size={12} /> : key === 'FAILED' ? <XCircle size={12} /> : key === 'DUPLICATE' ? <AlertTriangle size={12} /> : <Mail size={12} />}
                                        {cfg.label}: {count}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/60 dark:border-white/10">
                                        <th className="p-2 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selected.size === rows.length}
                                                onChange={toggleSelectAll}
                                                className="rounded border-gray-300 dark:border-gray-600"
                                            />
                                        </th>
                                        <th className="p-2 text-left font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">Name</th>
                                        <th className="p-2 text-left font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">Email</th>
                                        <th className="p-2 text-left font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">Company</th>
                                        <th className="p-2 text-left font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">Job Title</th>
                                        <th className="p-2 text-left font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">Status</th>
                                        <th className="p-2 text-left font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">Sent Count</th>
                                        <th className="p-2 text-left font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => {
                                        const sc = STATUS_CONFIG[row.status] || STATUS_CONFIG.PENDING;
                                        const isExpanded = expandedId === row.id;
                                        const isGenerating = generatingId === row.id;
                                        const isSending = sendingId === row.id;
                                        const needsResendConfirm = row.sendCount === 1 && !row.resendConfirmed;
                                        const permanentlyBlocked = row.sendCount > 1;

                                        return (
                                            <tr key={row.id} className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all">
                                                <td className="p-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.has(row.id)}
                                                        onChange={() => toggleSelect(row.id)}
                                                        disabled={row.status === 'SENT' || row.status === 'DUPLICATE'}
                                                        className="rounded border-gray-300 dark:border-gray-600"
                                                    />
                                                </td>
                                                <td className="p-2 font-semibold text-[#202124] dark:text-[#e8eaed] whitespace-nowrap">{row.name}</td>
                                                <td className="p-2 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{row.email}</td>
                                                <td className="p-2 text-gray-600 dark:text-gray-300 whitespace-nowrap">{row.company}</td>
                                                <td className="p-2 text-gray-600 dark:text-gray-300 whitespace-nowrap">{row.jobTitle}</td>
                                                <td className="p-2">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[0.65rem] font-bold ${sc.bg} ${sc.color}`}>
                                                        {row.status === 'SENT' ? <CheckCircle size={10} /> : row.status === 'FAILED' ? <XCircle size={10} /> : row.status === 'DUPLICATE' ? <AlertTriangle size={10} /> : <Mail size={10} />}
                                                        {sc.label}
                                                    </span>
                                                </td>
                                                <td className="p-2 text-xs text-gray-400">{row.sendCount || 0}</td>
                                                <td className="p-2">
                                                    <div className="flex items-center gap-1">
                                                        {row.status === 'PENDING' && (
                                                            <button
                                                                onClick={() => handleGenerateOne(row.id)}
                                                                disabled={isGenerating}
                                                                className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-500 transition-all disabled:opacity-40"
                                                                title="Generate Email"
                                                            >
                                                                {isGenerating ? <Loader size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                                            </button>
                                                        )}
                                                        {(row.status === 'GENERATED' || row.status === 'FAILED') && !permanentlyBlocked && (
                                                            <button
                                                                onClick={() => handleSendOne(row.id)}
                                                                disabled={isSending || needsResendConfirm || !hasResume}
                                                                className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-500 transition-all disabled:opacity-40"
                                                                title={!hasResume ? 'Upload your resume first' : needsResendConfirm ? 'Confirm resend first' : ''}
                                                            >
                                                                {isSending ? <Loader size={14} className="animate-spin" /> : <Send size={14} />}
                                                            </button>
                                                        )}
                                                        {permanentlyBlocked && (
                                                            <span className="text-[0.6rem] font-bold text-gray-400 px-1.5">Resent</span>
                                                        )}
                                                        {needsResendConfirm && (
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() => handleConfirmResend(row.id, true)}
                                                                    className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-500 transition-all"
                                                                    title="Confirm Resend"
                                                                >
                                                                    <UserCheck size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleConfirmResend(row.id, false)}
                                                                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 transition-all"
                                                                    title="Skip"
                                                                >
                                                                    <UserX size={14} />
                                                                </button>
                                                            </div>
                                                        )}
                                                        {(row.generatedSubject || row.generatedBody) && (
                                                            <button
                                                                onClick={() => {
                                                                    setExpandedId(isExpanded ? null : row.id);
                                                                    if (!isExpanded) {
                                                                        setEditingSubject(prev => ({ ...prev, [row.id]: row.generatedSubject || '' }));
                                                                        setEditingBody(prev => ({ ...prev, [row.id]: row.generatedBody || '' }));
                                                                    }
                                                                }}
                                                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-all"
                                                                title="View Email"
                                                            >
                                                                {isExpanded ? <ChevronUp size={14} /> : <Eye size={14} />}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Expanded Email Preview */}
                        {rows.filter(r => expandedId === r.id).map(row => (
                            <div key={`preview-${row.id}`} className="mt-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-white/60 dark:border-white/10">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-extrabold text-[#202124] dark:text-[#e8eaed]">
                                        Email to: {row.name} ({row.email})
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleSendOne(row.id)}
                                            disabled={sendingId === row.id || (row.sendCount > 0 && !row.resendConfirmed) || row.sendCount > 1 || !hasResume}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-button hover:shadow-card-hover transition-all disabled:opacity-50"
                                        >
                                            {sendingId === row.id ? <Loader size={14} className="animate-spin" /> : <Send size={14} />}
                                            {row.sendCount > 1 ? 'Resent' : 'Send'}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                                        <input
                                            type="text"
                                            value={editingSubject[row.id] || ''}
                                            onChange={e => setEditingSubject(prev => ({ ...prev, [row.id]: e.target.value }))}
                                            className="w-full mt-1 px-3 py-2 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 border border-white/60 dark:border-white/10 text-sm text-[#202124] dark:text-[#e8eaed] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase">Body</label>
                                        <textarea
                                            value={editingBody[row.id] || ''}
                                            onChange={e => setEditingBody(prev => ({ ...prev, [row.id]: e.target.value }))}
                                            rows={8}
                                            className="w-full mt-1 px-3 py-2 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 border border-white/60 dark:border-white/10 text-sm text-[#202124] dark:text-[#e8eaed] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {rows.length === 0 && !loading && (
                    <div className="rounded-[20px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md shadow-card p-8 text-center">
                        <FileSpreadsheet size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <h3 className="text-lg font-extrabold text-[#202124] dark:text-[#e8eaed] mb-1">No Contacts Yet</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Download the template, fill it with your hiring manager contacts, and upload the Excel file above.</p>
                    </div>
                )}
            </div>

            {/* Resend Confirmation Modal */}
            {showResendModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1d23] rounded-2xl border border-white/60 dark:border-white/10 shadow-modal p-6 max-w-sm w-full mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                                <AlertTriangle size={20} className="text-amber-600" />
                            </div>
                            <h3 className="text-lg font-extrabold text-[#202124] dark:text-[#e8eaed]">Resend Confirmation</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            Some contacts have already been sent emails. Do you want to send again?
                        </p>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setShowResendModal(false)}
                                className="px-4 py-2 rounded-xl border border-white/60 dark:border-white/10 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { setShowResendModal(false); modalAction(); }}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-button hover:shadow-card-hover transition-all"
                            >
                                Send Again
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!hasResume && !resumeChecking && (
                <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-modal">
                    <AlertCircle size={14} />
                    Upload your resume before sending emails
                </div>
            )}
        </div>
    );
};

export default ColdEmailCampaign;
