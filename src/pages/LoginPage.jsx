import {
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAdminAuth } from "../AdminAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { admin, login } = useAdminAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError(t("login.errorUsername"));
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await login(username, password);
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.title || t("auth.invalidCredentials");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const baseInputClasses = `w-full rounded-lg border-2 p-2 ${isRTL ? "pr-10" : "pl-10"} dark:bg-gray-800 dark:text-gray-100 transition-all duration-200 shadow-sm hover:shadow-md`;
  const errorInputClasses =
    "border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500";
  const normalInputClasses =
    "border-gray-300 dark:border-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 dark:focus:border-violet-400";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-violet-50/30 to-gray-100 dark:from-gray-900 dark:via-violet-950/20 dark:to-gray-950">
      {/* Left Side - Brand Section */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-violet-600 via-violet-700 to-violet-800 p-12 text-white relative overflow-hidden shadow-2xl"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="p-4 bg-white/20 rounded-2xl backdrop-blur-md relative z-10 shadow-2xl border border-white/30"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-32 object-contain drop-shadow-lg"
          />
        </motion.div>
        <motion.h1
          className="text-4xl font-extrabold mt-8 relative z-10 drop-shadow-lg tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t("login.title")}
        </motion.h1>
        <motion.p
          className="text-xl text-violet-100 mt-4 relative z-10 font-medium tracking-wide"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("login.tagline")}
        </motion.p>
        <motion.p
          className="text-sm text-violet-200 mt-6 max-w-md text-center relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t("login.description")}
        </motion.p>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative overflow-hidden p-8">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors z-20"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20"></div>

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="glass-strong p-10 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center mb-8">
              <motion.div
                className="p-3"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-20 h-20 object-contain"
                />
              </motion.div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-4 tracking-tight">
                {t("login.header")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium text-center">
                {t("login.subtitle")}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className={`block text-sm font-semibold ${
                    error
                      ? "text-red-700 dark:text-red-400"
                      : "text-gray-700 dark:text-gray-300"
                  } mb-2`}
                >
                  {t("login.username")}
                </label>
                <div className="relative">
                  <div
                    className={`pointer-events-none absolute inset-y-0 ${isRTL ? "right-0 pr-3" : "left-0 pl-3"} flex items-center`}
                  >
                    <User
                      size={16}
                      className={`${error ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`}
                    />
                  </div>
                  <input
                    type="text"
                    id="username"
                    className={`${baseInputClasses} ${
                      error ? errorInputClasses : normalInputClasses
                    }`}
                    placeholder={t("login.usernamePlaceholder")}
                    value={username}
                    onChange={handleInputChange(setUsername)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-semibold ${
                    error
                      ? "text-red-700 dark:text-red-400"
                      : "text-gray-700 dark:text-gray-300"
                  } mb-2`}
                >
                  {t("login.password")}
                </label>
                <div className="relative">
                  <div
                    className={`pointer-events-none absolute inset-y-0 ${isRTL ? "right-0 pr-3" : "left-0 pl-3"} flex items-center`}
                  >
                    <Lock
                      size={16}
                      className={`${error ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`${baseInputClasses} ${
                      error ? errorInputClasses : normalInputClasses
                    } ${isRTL ? "pl-10" : "pr-10"}`}
                    placeholder={t("login.passwordPlaceholder")}
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 ${isRTL ? "left-0 pl-3" : "right-0 pr-3"} flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors`}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    className="flex items-start p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-400 border border-red-200 dark:border-red-800"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                  >
                    <AlertCircle
                      size={20}
                      className="text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:from-violet-700 hover:to-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    {t("login.loggingIn")}
                  </>
                ) : (
                  <>
                    {t("login.loginButton")}
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
