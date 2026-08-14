import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12 glass-strong rounded-2xl border border-red-200 dark:border-red-800"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <AlertCircle size={48} className="text-red-600 dark:text-red-400" />
      </motion.div>
      <motion.h3
        className="text-xl font-bold text-red-900 dark:text-red-300 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Error
      </motion.h3>
      <motion.p
        className="text-sm text-red-700 dark:text-red-400 text-center mb-6 max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={16} />
          Retry
        </motion.button>
      )}
    </motion.div>
  );
};
