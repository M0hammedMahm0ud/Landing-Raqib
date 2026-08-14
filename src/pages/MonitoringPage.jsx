import { useState, useEffect } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { adminApi } from "../api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export const MonitoringPage = () => {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getCompanyMetrics();
      setMetrics(response.data);
    } catch (err) {
      toast.error(t("monitoring.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text={t("monitoring.loading")} />;
  }

  return (
    <>
      <PageHeader
        title={t("monitoring.title")}
        subtitle={t("monitoring.subtitle")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.companyId}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">{metric.companyName}</h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("monitoring.users")}</span>
                <span className="font-medium">
                  {metric.activeUsers}/{metric.totalUsers}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("monitoring.cameras")}</span>
                <span className="font-medium">
                  {metric.activeCameras}/{metric.totalCameras}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("monitoring.todayIncidents")}</span>
                <span className="font-medium text-yellow-600">
                  {metric.todayIncidents}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("monitoring.totalIncidents")}</span>
                <span className="font-medium">{metric.totalIncidents}</span>
              </div>

              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500">
                  {t("monitoring.lastActivity")}{" "}
                  {format(new Date(metric.lastActivity), "MMM dd, HH:mm")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
