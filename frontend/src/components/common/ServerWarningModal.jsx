import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ServerWarningModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the warning has been shown in this session
    const hasShownWarning = sessionStorage.getItem('server_warning_shown');
    
    if (!hasShownWarning) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, []);

  const closeWithFlag = () => {
    setIsOpen(false);
    sessionStorage.setItem('server_warning_shown', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWithFlag}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <button 
                  onClick={closeWithFlag}
                  className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Server Awareness
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                This project is hosted on a <span className="font-semibold text-neutral-900 dark:text-neutral-200">Free Tier</span> service. If the app has been idle, the server may take <span className="font-semibold text-amber-600 dark:text-amber-400">1-2 minutes</span> to "wake up" and respond to requests.
              </p>
              
              <div className="p-4 bg-neutral-50 dark:bg-zinc-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 italic text-sm text-neutral-700 dark:text-neutral-300">
                "Your patience is appreciated while the server warms up!"
              </div>

              <button
                onClick={closeWithFlag}
                className="w-full mt-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServerWarningModal;
