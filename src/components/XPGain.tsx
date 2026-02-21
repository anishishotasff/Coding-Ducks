import { motion } from 'framer-motion';

interface Props {
  amount: number;
  show: boolean;
}

export default function XPGain({ amount, show }: Props) {
  if (!show) return null;

  return (
    <motion.div
      className="xp-gain"
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{ y: -100, opacity: 0, scale: 1.5 }}
      transition={{ duration: 2 }}
    >
      +{amount} XP
    </motion.div>
  );
}
