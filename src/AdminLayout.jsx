import { Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "./AdminAuthContext";
import { Sidebar } from "./components/Sidebar";
import { motion } from "framer-motion";

export const AdminLayout = () => {
  const { admin, loading } = useAdminAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-violet-50/30 to-gray-100 dark:from-gray-900 dark:via-violet-950/20 dark:to-gray-950">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="rounded-full h-16 w-16 border-4 border-violet-200 dark:border-violet-800 border-t-violet-600 dark:border-t-violet-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("admin.loading")}</p>
        </motion.div>
      </div>
    );
  }

  // Guard: Only authenticated users can access
  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex bg-gradient-to-br from-white via-violet-50/30 to-gray-100 dark:from-gray-900 dark:via-violet-950/20 dark:to-gray-950 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto ltr:ml-64 rtl:mr-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};
