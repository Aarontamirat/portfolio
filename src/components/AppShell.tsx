"use client";

import { motion } from "framer-motion";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
