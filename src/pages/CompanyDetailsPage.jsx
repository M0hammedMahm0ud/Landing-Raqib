import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { Button } from "../components/shared/Button";
import {
  ArrowLeft,
  Users,
  Camera,
  AlertTriangle,
  Calendar,
  CheckCircle,
  XCircle,
  Activity,
  TrendingUp,
} from "lucide-react";
import { adminApi } from "../api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const StatCard = ({ title, value, icon, color, index }) => {
  const colorClasses = {
    violet: "bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-800/20 text-violet-600 dark:text-violet-400",
    blue: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400",
    green: "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 text-green-600 dark:text-green-400",
    yellow: "bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 text-yellow-600 dark:text-yellow-400",
    red: "bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 text-red-600 dark:text-red-400",
  };

  return (
    <motion.div
      className="glass-strong rounded-xl p-6 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
        <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export const CompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [company, setCompany] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanyDetails();
  }, [id]);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [companyResponse, statsResponse] = await Promise.all([
        adminApi.getCompany(id),
        adminApi.getCompanyStats(id),
      ]);

      setCompany(companyResponse.data);
      setStats(statsResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || t("companyDetails.errorLoading"));
      toast.error(t("companyDetails.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text={t("companyDetails.loading")} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchCompanyDetails} />;
  }

  if (!company) {
    return <ErrorMessage message={t("companyDetails.notFound")} />;
  }

  const daysUntilExpiry = company.subscriptionEndDate
    ? Math.ceil((new Date(company.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={company.name}
        subtitle={t("companyDetails.subtitle")}
        action={
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate("/admin/companies")}>
            {t("common.back")}
          </Button>
        }
      />

      {/* Company Info Card */}
      <motion.div
        className="glass-strong rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{company.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{company.address}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              company.isActive
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
            }`}
          >
            {company.isActive ? t("companies.active") : t("companies.inactive")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              {t("companyDetails.subscriptionPlan")}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {company.subscriptionPlan}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              {t("companyDetails.subscriptionExpires")}
            </p>
            <p className={`text-lg font-semibold ${
              daysUntilExpiry && daysUntilExpiry < 30
                ? "text-red-600 dark:text-red-400"
                : "text-gray-900 dark:text-gray-100"
            }`}>
              {company.subscriptionEndDate
                ? format(new Date(company.subscriptionEndDate), "MMM dd, yyyy")
                : t("companies.na")}
              {daysUntilExpiry && daysUntilExpiry > 0 && (
                <span className="text-xs ml-2">({daysUntilExpiry} {t("companyDetails.days")})</span>
              )}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              {t("companyDetails.contactPerson")}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {company.contactPerson || t("companies.na")}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
              {t("companyDetails.phoneNumber")}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {company.phoneNumber || t("companies.na")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title={t("companyDetails.totalUsers")}
            value={`${stats.activeUsers || 0}/${company.maxUsers || 0}`}
            icon={<Users size={24} />}
            color="violet"
            index={0}
          />
          <StatCard
            title={t("companyDetails.activeCameras")}
            value={`${stats.activeCameras || 0}/${company.maxCameras || 0}`}
            icon={<Camera size={24} />}
            color="blue"
            index={1}
          />
          <StatCard
            title={t("companyDetails.totalIncidents")}
            value={stats.totalIncidents || 0}
            icon={<AlertTriangle size={24} />}
            color="yellow"
            index={2}
          />
          <StatCard
            title={t("companyDetails.thisMonth")}
            value={stats.monthlyIncidents || 0}
            icon={<TrendingUp size={24} />}
            color="green"
            index={3}
          />
        </div>
      )}

      {/* Users & Cameras Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          className="glass-strong rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Users size={20} className="text-violet-600 dark:text-violet-400" />
            {t("companyDetails.usersOverview")}
          </h3>
          <div className="space-y-3">
            {stats?.users?.slice(0, 5).map((user, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{user.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                </div>
                {user.isActive ? (
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle size={16} className="text-red-600 dark:text-red-400" />
                )}
              </div>
            )) || (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                {t("companyDetails.noUsers")}
              </p>
            )}
          </div>
        </motion.div>

        {/* Cameras Status */}
        <motion.div
          className="glass-strong rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Camera size={20} className="text-blue-600 dark:text-blue-400" />
            {t("companyDetails.camerasOverview")}
          </h3>
          <div className="space-y-3">
            {stats?.cameras?.slice(0, 5).map((camera, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{camera.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{camera.location}</p>
                </div>
                {camera.isActive ? (
                  <Activity size={16} className="text-green-600 dark:text-green-400 animate-pulse" />
                ) : (
                  <XCircle size={16} className="text-gray-400" />
                )}
              </div>
            )) || (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                {t("companyDetails.noCameras")}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
