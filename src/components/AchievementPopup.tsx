import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface Props {
  show: boolean;
  title: string;
  description: string;
  icon: string;
  onClose: () => void;
}

export default function AchievementPopup({ show, title, description, icon, onClose }: Props) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="achievement-popup"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="achievement-icon">{icon}</div>
          <div className="achievement-content">
            <h3>🎉 Achievement Unlocked!</h3>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
