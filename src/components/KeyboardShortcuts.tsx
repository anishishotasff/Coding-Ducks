import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && e.shiftKey) {
        setShowHelp(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowHelp(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <motion.button
        className="help-button"
        onClick={() => setShowHelp(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Keyboard Shortcuts (Shift + ?)"
      >
        ?
      </motion.button>

      <AnimatePresence>
        {showHelp && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
            />
            <motion.div
              className="shortcuts-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2>⌨️ Keyboard Shortcuts</h2>
              <div className="shortcuts-list">
                <div className="shortcut-item">
                  <kbd>Shift</kbd> + <kbd>?</kbd>
                  <span>Toggle this help</span>
                </div>
                <div className="shortcut-item">
                  <kbd>Esc</kbd>
                  <span>Close modals</span>
                </div>
                <div className="shortcut-item">
                  <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
                  <span>Run code (in editor)</span>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setShowHelp(false)}>
                Got it!
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
