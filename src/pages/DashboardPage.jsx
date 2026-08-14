import { useState, useEffect } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { Building2, Users, AlertTriangle, Activity } from "lucide-react";
import { adminApi } from "../api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const StatCard = ({ title, value, icon, iconColor, index }) => {
  const colorClasses = {
    violet: {
      bg: "bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-800/20",
      text: "text-violet-600 dark:text-violet-400",
      glow: "shadow-lg shadow-violet-500/20 dark:shadow-violet-500/10",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20",
      text: "text-blue-600 dark:text-blue-400",
      glow: "shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10",
    },
    green: {
      bg: "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20",
      text: "text-green-600 dark:text-green-400",
      glow: "shadow-lg shadow-green-500/20 dark:shadow-green-500/10",
    },
    yellow: {
      bg: "bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20",
      text: "text-yellow-600 dark:text-yellow-400",
      glow: "shadow-lg shadow-yellow-500/20 dark:shadow-yellow-500/10",
    },
  };

  return (
    <motion.div
      className="glass-strong rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <motion.p
            className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 stat-value"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
          >
            {value}
          </motion.p>
        </div>
        <motion.div
          className={`p-4 rounded-xl ${colorClasses[iconColor].bg} ${colorClasses[iconColor].glow}`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={colorClasses[iconColor].text}>{icon}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const DashboardPage = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [healthResponse, alertsResponse] = await Promise.all([
        adminApi.getSystemHealth(),
        adminApi.getAlerts(),
      ]);

      setStats(healthResponse.data);
      setAlerts(alertsResponse.data.slice(0, 5)); // Show top 5 alerts
    } catch (err) {
      setError(err.response?.data?.message || t("dashboard.errorLoading"));
      toast.error(t("dashboard.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text={t("dashboard.loading")} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchDashboardData} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("dashboard.title")}
        subtitle={t("dashboard.subtitle")}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("dashboard.totalCompanies")}
          value={stats?.totalCompanies || 0}
          icon={<Building2 size={28} />}
          iconColor="violet"
          index={0}
        />
        <StatCard
          title={t("dashboard.totalUsers")}
          value={stats?.totalUsers || 0}
          icon={<Users size={28} />}
          iconColor="blue"
          index={1}
        />
        <StatCard
          title={t("dashboard.activeCameras")}
          value={stats?.activeCameras || 0}
          icon={<Activity size={28} />}
          iconColor="green"
          index={2}
        />
        <StatCard
          title={t("dashboard.todayIncidents")}
          value={stats?.todayIncidents || 0}
          icon={<AlertTriangle size={28} />}
          iconColor="yellow"
          index={3}
        />
      </div>

      {/* Alerts Section */}
      <motion.div
        className="glass-strong rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <AlertTriangle size={24} className="text-yellow-600 dark:text-yellow-400" />
            {t("dashboard.systemAlerts")}
          </h2>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400">
            {alerts.length} {t("dashboard.active")}
          </span>
        </div>

        {alerts.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <Activity size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t("dashboard.allSystemsNormal")}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <motion.div
                key={idx}
                className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${
                  alert.severity === "critical"
                    ? "bg-red-50 dark:bg-red-900/20 border-red-600 dark:border-red-500"
                    : alert.severity === "high"
                    ? "bg-orange-50 dark:bg-orange-900/20 border-orange-600 dark:border-orange-500"
                    : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600 dark:border-yellow-500"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {alert.companyName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {alert.message}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ml-4 flex-shrink-0 ${
                      alert.severity === "critical"
                        ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"
                        : alert.severity === "high"
                        ? "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300"
                        : "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
