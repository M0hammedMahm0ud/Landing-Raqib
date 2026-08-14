import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ThemeToggle = ({ isCollapsed = false }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Always show circular icon-only version
  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-linear-to-br hover:from-violet-100 hover:to-violet-200 dark:hover:from-gray-800 dark:hover:to-violet-900/30 transition-all duration-300 border border-transparent hover:border-violet-200 dark:hover:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 relative"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Ripple effect */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: isDark
            ? "0 0 16px 4px #7c3aed55"
            : "0 0 12px 2px #a5b4fc55",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 360 : 0,
          scale: isDark ? 1.15 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon
            size={20}
            className="text-violet-600 dark:text-violet-400 drop-shadow-[0_0_8px_#7c3aed]"
          />
        ) : (
          <Sun
            size={20}
            className="text-violet-600 drop-shadow-[0_0_8px_#a78bfa]"
          />
        )}
      </motion.div>
    </motion.button>
  );
};
