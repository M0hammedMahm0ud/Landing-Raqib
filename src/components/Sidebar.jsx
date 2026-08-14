import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Activity,
  LogOut,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { useAdminAuth } from "../AdminAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./shared/ThemeToggle";
import { LanguageToggle } from "./shared/LanguageToggle";
import { adminApi } from "../api";
import logo from "../assets/logo.png";

const SidebarItem = ({ icon, text, to, isEnd = false, index, isCollapsed, badge }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
  >
    <NavLink
      to={to}
      end={isEnd}
      className={({ isActive }) =>
        `flex items-center ${isCollapsed ? "justify-center" : ""} p-3 my-1 rounded-lg cursor-pointer
         transition-all duration-200 group
         ${
           isActive
             ? "bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-800/20 text-violet-700 dark:text-violet-400 font-semibold shadow-md border border-violet-200 dark:border-violet-700"
             : "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-br hover:from-violet-50 hover:to-violet-100/50 dark:hover:from-gray-800 dark:hover:from-violet-900/20 border border-transparent hover:border-violet-200 dark:hover:border-violet-800"
         }`
      }
      title={isCollapsed ? text : ""}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {icon}
      </motion.div>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            className="ml-3 flex-1 flex items-center justify-between"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span>{text}</span>
            {badge > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                {badge}
              </span>
            )}
          </motion.span>
        )}
        {isCollapsed && badge > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-red-500 text-white">
            {badge}
          </span>
        )}
      </AnimatePresence>
    </NavLink>
  </motion.li>
);

export const Sidebar = () => {
  const { admin, logout } = useAdminAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [pendingCount, setPendingCount] = useState(0);

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    let cancelled = false;
    const fetchCount = async () => {
      try {
        const response = await adminApi.getPendingActivationCount();
        if (!cancelled) setPendingCount(response.data?.pending ?? 0);
      } catch {
        // Non-fatal; badge simply stays at 0.
      }
    };
    fetchCount();
    const id = setInterval(fetchCount, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: t("sidebar.dashboard"), to: "/admin", isEnd: true },
    { icon: <Building2 size={20} />, text: t("sidebar.companies"), to: "/admin/companies" },
    { icon: <Inbox size={20} />, text: t("sidebar.activationRequests"), to: "/admin/activation-requests", badge: pendingCount },
    { icon: <Users size={20} />, text: t("sidebar.users"), to: "/admin/users" },
    { icon: <Activity size={20} />, text: t("sidebar.monitoring"), to: "/admin/monitoring" },
  ];

  return (
    <motion.aside
      className={`fixed top-0 ${isCollapsed ? "w-20" : "w-64"} p-4 bg-gradient-to-b from-white via-white to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-violet-950/20 flex flex-col transition-all duration-300 h-screen overflow-hidden z-10 shadow-xl shadow-violet-500/5 ltr:left-0 rtl:right-0 ltr:border-r rtl:border-l border-gray-200 dark:border-gray-700`}
      initial={{ x: isRTL ? 100 : -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: isCollapsed ? "5rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Logo with animation and collapse button */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {/* Logo - only shows when expanded */}
          {!isCollapsed && (
            <div className="flex items-center min-w-0 overflow-hidden">
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded-xl" />
              </motion.div>

              {/* App name - only shows when expanded */}
              <AnimatePresence>
                <motion.div
                  className={`${isRTL ? "mr-3" : "ml-3"}`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <span className="text-xl font-extrabold bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent dark:from-violet-400 dark:to-violet-600 whitespace-nowrap">
                    {t("login.title").replace("Welcome to ", "").replace("مرحباً بك في ", "")}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t("login.tagline")}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Collapse/Expand Button */}
          <motion.button
            onClick={toggleCollapsed}
            className={`p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-gray-800 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 flex-shrink-0 border border-transparent hover:border-violet-200 dark:hover:border-violet-700 ${
              isCollapsed ? "mx-auto" : (isRTL ? "mr-3" : "ml-3")
            }`}
            title={isCollapsed ? t("sidebar.expandSidebar") : t("sidebar.collapseSidebar")}
            aria-label={isCollapsed ? t("sidebar.expandSidebar") : t("sidebar.collapseSidebar")}
            aria-expanded={!isCollapsed}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCollapsed ? (
              isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
            ) : (
              isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />
            )}
          </motion.button>
        </div>

        {/* Collapsed logo - shows when sidebar is collapsed */}
        {isCollapsed && (
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-xl" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Navigation with staggered animations */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden mt-3">
        <ul>
          {menuItems.map((item, index) => (
            <SidebarItem
              key={item.to}
              {...item}
              index={index}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>

      {/* Theme and Language Toggle Buttons - One Line */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ThemeToggle isCollapsed={isCollapsed} />
        <LanguageToggle isCollapsed={isCollapsed} />
      </motion.div>

      {/* User Info & Logout Box with animation */}
      <motion.div
        className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div
          className={`flex items-center ${isCollapsed ? "justify-center flex-col gap-2" : "justify-between"} p-3 rounded-xl hover:bg-gradient-to-br hover:from-violet-50 hover:to-violet-100/50 dark:hover:from-gray-800 dark:hover:to-violet-900/20 transition-all duration-300 border border-transparent hover:border-violet-200 dark:hover:border-violet-800`}
        >
          {/* User Info */}
          <div
            className={`flex items-center ${isCollapsed ? "flex-col" : ""} overflow-hidden`}
          >
            <motion.div whileHover={{ scale: 1.1 }} title={admin?.username}>
              <UserCircle
                size={isCollapsed ? 32 : 40}
                className="text-gray-400 dark:text-gray-500 flex-shrink-0"
              />
            </motion.div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className={`${isRTL ? "mr-3" : "ml-3"} overflow-hidden`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate"
                    title={admin ? admin.username : ""}
                  >
                    {admin ? admin.username : t("common.loading")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t("sidebar.roleLabel")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout Button */}
          <motion.button
            onClick={logout}
            title={t("sidebar.logout")}
            aria-label={t("sidebar.logout")}
            className={`p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-800/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-800 ${isCollapsed ? "mt-2" : ""}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </motion.div>
    </motion.aside>
  );
};
