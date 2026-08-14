import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LanguageToggle = ({ isCollapsed = false }) => {
  const { i18n, t } = useTranslation();
  const language = i18n.language;

  const handleToggle = async () => {
    const newLang = language === "en" ? "ar" : "en";
    await i18n.changeLanguage(newLang);

    // Force document direction update
    const root = document.documentElement;
    root.setAttribute("lang", newLang);
    root.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");

    // Force a re-render by triggering a storage event
    window.dispatchEvent(new Event('storage'));
  };

  // Always show circular icon-only version
  return (
    <motion.button
      onClick={handleToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 dark:hover:from-gray-800 dark:hover:to-blue-900/30 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 relative"
      aria-label={t("languageToggle.switchLanguage")}
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Ripple effect */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: language === "ar"
            ? "0 0 16px 4px #3b82f655"
            : "0 0 12px 2px #60a5fa55",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          rotate: language === "ar" ? 360 : 0,
          scale: language === "ar" ? 1.15 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Languages
          size={20}
          className="text-blue-600 dark:text-blue-400 drop-shadow-[0_0_8px_#3b82f6]"
        />
      </motion.div>
    </motion.button>
  );
};
