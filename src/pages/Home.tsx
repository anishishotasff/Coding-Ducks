import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="page home-page">
      <div className="hero">
        <motion.h1 
          className="hero-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="gradient-text">Coding Ducks</span> 🦆
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your coding dojo — where you level up your skills, battle in real-time code duels, 
          and earn badges like a true code warrior.
        </motion.p>
        <motion.div 
          className="hero-actions"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to="/dojo" className="btn btn-primary">Start Training</Link>
          <Link to="/duels" className="btn btn-secondary">Enter Duel Arena</Link>
        </motion.div>
      </div>

      <div className="features">
        {[
          { icon: '💪', title: 'Level Up', desc: 'Practice coding challenges and track your progress' },
          { icon: '⚔️', title: 'Code Duels', desc: 'Battle other developers in real-time coding challenges' },
          { icon: '🏆', title: 'Earn Badges', desc: 'Unlock achievements and climb the leaderboard' }
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + idx * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
