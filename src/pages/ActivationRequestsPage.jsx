import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Inbox,
  CheckCircle2,
  XCircle,
  History,
  Building2,
  Mail,
  Phone,
  Server,
  CalendarDays,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";

import { PageHeader } from "../components/common/PageHeader";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/shared/Button";
import { adminApi } from "../api";

const TABS = [
  { key: "Pending", labelKey: "tabs.pending" },
  { key: "Approved", labelKey: "tabs.approved" },
  { key: "Rejected", labelKey: "tabs.rejected" },
  { key: null, labelKey: "tabs.all" },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  Cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

export const ActivationRequestsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Pending");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [transitions, setTransitions] = useState([]);

  const [duration, setDuration] = useState(12);
  const [plan, setPlan] = useState("Pro");
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");

  const [generated, setGenerated] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.getActivationRequests(activeTab);
      setRequests(response.data || []);
    } catch (err) {
      toast.error(t("common.error"));
    } finally {
      setLoading(false);
    }
  }, [activeTab, t]);

  useEffect(() => { load(); }, [load]);

  // Refresh when navigating to the page (catches fresh submissions)
  useEffect(() => {
    const handler = () => load();
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, [load]);

  const openApprove = (row) => {
    setSelected(row);
    setDuration(row.requestedMonths || 12);
    setPlan("Pro");
    setNote("");
    setGenerated(null);
    setApproveOpen(true);
  };

  const openReject = (row) => {
    setSelected(row);
    setReason("");
    setRejectOpen(true);
  };

  const openHistory = async (row) => {
    setSelected(row);
    setHistoryOpen(true);
    try {
      const response = await adminApi.getActivationRequestTransitions(row.id);
      setTransitions(response.data || []);
    } catch {
      setTransitions([]);
    }
  };

  const submitApprove = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const response = await adminApi.approveActivationRequest(selected.id, {
        durationMonths: parseInt(duration, 10),
        plan,
        note: note || null,
      });
      setGenerated(response.data?.generatedCredentials || null);
      toast.success(t("activationRequests.approve.success"));
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || t("common.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const submitReject = async () => {
    if (!selected || !reason.trim()) {
      toast.error(t("activationRequests.reject.reasonLabel"));
      return;
    }
    setSubmitting(true);
    try {
      await adminApi.rejectActivationRequest(selected.id, reason);
      toast.success(t("activationRequests.reject.success"));
      setRejectOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || t("common.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title={t("activationRequests.title")}
        subtitle={t("activationRequests.subtitle")}
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.labelKey}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-violet-50 dark:hover:bg-gray-700"
            }`}
          >
            {t(`activationRequests.${tab.labelKey}`)}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : requests.length === 0 ? (
        <div className="glass-strong p-12 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
          <Inbox size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t("activationRequests.empty")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((row, i) => (
            <RequestCard
              key={row.id}
              row={row}
              index={i}
              onApprove={openApprove}
              onReject={openReject}
              onHistory={openHistory}
            />
          ))}
        </div>
      )}

      {/* Approve modal */}
      <Modal
        isOpen={approveOpen}
        onClose={() => { setApproveOpen(false); setGenerated(null); }}
        title={t("activationRequests.approve.title")}
      >
        {selected && !generated && (
          <form
            onSubmit={(e) => { e.preventDefault(); submitApprove(); }}
            className="space-y-4"
          >
            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3 text-sm space-y-1">
              <p><strong>{t("activationRequests.fields.company")}:</strong> {selected.companyName}</p>
              <p><strong>{t("activationRequests.fields.owner")}:</strong> {selected.ownerName}</p>
              <p><strong>{t("activationRequests.fields.requestType")}:</strong>{" "}
                {t(`activationRequests.requestTypes.${selected.requestType}`, selected.requestType)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("activationRequests.approve.durationLabel")}
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="3">3 {t("common.months") || "months"}</option>
                <option value="6">6 {t("common.months") || "months"}</option>
                <option value="12">12 {t("common.months") || "months"}</option>
                <option value="24">24 {t("common.months") || "months"}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("activationRequests.approve.planLabel")}
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="Pro">Pro</option>
                <option value="Ultra">Ultra</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("activationRequests.approve.noteLabel")}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" fullWidth isLoading={submitting} icon={CheckCircle2}>
                {t("activationRequests.approve.button")}
              </Button>
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setApproveOpen(false)}
                disabled={submitting}
              >
                {t("common.cancel")}
              </Button>
            </div>
          </form>
        )}

        {selected && generated && (
          <GeneratedPasswordBlock generated={generated} onClose={() => { setApproveOpen(false); setGenerated(null); }} />
        )}
      </Modal>

      {/* Reject modal */}
      <Modal
        isOpen={rejectOpen}
        onClose={() => setRejectOpen(false)}
        title={t("activationRequests.reject.title")}
      >
        {selected && (
          <form onSubmit={(e) => { e.preventDefault(); submitReject(); }} className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>{t("activationRequests.fields.company")}:</strong> {selected.companyName}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("activationRequests.reject.reasonLabel")}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="danger" fullWidth isLoading={submitting} icon={XCircle}>
                {t("activationRequests.reject.button")}
              </Button>
              <Button type="button" variant="outline" fullWidth onClick={() => setRejectOpen(false)}>
                {t("common.cancel")}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* History modal */}
      <Modal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        title={t("activationRequests.history")}
      >
        {selected && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>{t("activationRequests.fields.company")}:</strong> {selected.companyName}
            </p>
            {transitions.length === 0 ? (
              <p className="text-sm text-gray-500">—</p>
            ) : (
              <ol className="relative border-s border-gray-200 dark:border-gray-700 pl-4 space-y-3">
                {transitions.map((tr) => (
                  <li key={tr.id} className="ms-2">
                    <span className="absolute -start-1.5 mt-1.5 w-3 h-3 rounded-full bg-violet-500" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {tr.fromStatus} → {tr.toStatus}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tr.adminUsername || "system"} · {format(new Date(tr.createdAt), "yyyy-MM-dd HH:mm:ss")}
                    </p>
                    {tr.reason && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{tr.reason}</p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

const RequestCard = ({ row, index, onApprove, onReject, onHistory }) => {
  const { t } = useTranslation();
  const isPending = row.status === "Pending";
  return (
    <motion.div
      className="glass-strong rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg flex items-center gap-2">
            <Building2 size={18} className="text-violet-500" />
            {row.companyName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t(`activationRequests.requestTypes.${row.requestType}`, row.requestType)}
          </p>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[row.status] || statusColors.Cancelled}`}>
          {row.status}
        </span>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
        <p className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {row.email}</p>
        <p className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {row.phoneNumber}</p>
        <p className="flex items-center gap-2"><Server size={14} className="text-gray-400" /> {row.customerMachineId || "—"}</p>
        <p className="flex items-center gap-2"><CalendarDays size={14} className="text-gray-400" />{" "}
          {row.requestedMonths} {t("common.months") || "months"} ·{" "}
          {format(new Date(row.createdAt), "yyyy-MM-dd HH:mm")}
        </p>
        {row.passwordRevealed && (
          <p className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <Check size={14} /> {t("activationRequests.passwordRevealed")}
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {isPending && (
          <>
            <Button size="small" onClick={() => onApprove(row)} icon={CheckCircle2} className="flex-1">
              {t("activationRequests.approve.button")}
            </Button>
            <Button size="small" variant="danger" onClick={() => onReject(row)} icon={XCircle} className="flex-1">
              {t("activationRequests.reject.button")}
            </Button>
          </>
        )}
        <Button size="small" variant="outline" onClick={() => onHistory(row)} icon={History}>
          {t("activationRequests.history")}
        </Button>
      </div>
    </motion.div>
  );
};

const GeneratedPasswordBlock = ({ generated, onClose }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = [
      `${t("activationRequests.approve.generatedUsername")}: ${generated.username}`,
      `${t("activationRequests.approve.generatedCompanyId")}: ${generated.companyId}`,
      `${t("activationRequests.approve.generatedPassword")}: ${generated.password}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 flex items-start gap-2">
        <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          {generated.message}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">{t("activationRequests.approve.generatedUsername")}</p>
        <p className="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">{generated.username}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">{t("activationRequests.approve.generatedCompanyId")}</p>
        <p className="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">{generated.companyId}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">{t("activationRequests.approve.generatedPassword")}</p>
        <div className="flex items-center justify-between gap-2">
          <code className="font-mono text-sm text-red-600 dark:text-red-400 break-all">{generated.password}</code>
          <button
            onClick={copy}
            className="p-2 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg flex-shrink-0"
            title="Copy"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>
      <Button fullWidth onClick={onClose}>
        {t("common.close")}
      </Button>
    </div>
  );
};
