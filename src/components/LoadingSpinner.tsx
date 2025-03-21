"use client";
import { motion } from "framer-motion";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-full"
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      {/* Hidden text for screen readers */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
