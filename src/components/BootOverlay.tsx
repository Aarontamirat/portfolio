"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "BOOTING SYSTEM...",
  "INITIALIZING CORE MODULES...",
  "LOADING INTERFACE...",
  "ACCESS GRANTED",
];

export default function BootOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("booted");

    if (!hasBooted) {
      setVisible(true);
      sessionStorage.setItem("booted", "true");

      setTimeout(() => {
        setVisible(false);
      }, 5200);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="w-full fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-black font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-2 text-sm text-cyan-400">
            {bootLines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.9 }}
                className="loading"
              >
                {">"} {line}
              </motion.p>
            ))}
          </div>

          <div className="scanner scannerFlicker"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
