import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userStore } from '../store/userStore';

const badgeData = [
  { id: 'first-steps', name: 'First Steps', icon: '👶', description: 'Complete your first challenge' },
  { id: 'problem-solver', name: 'Problem Solver', icon: '🧩', description: 'Solve 10 challenges' },
  { id: 'coding-master', name: 'Coding Master', icon: '🎓', description: 'Solve 50 challenges' },
  { id: 'first-blood', name: 'First Blood', icon: '⚔️', description: 'Win your first duel' },
  { id: 'duel-champion', name: 'Duel Champion', icon: '🏆', description: 'Win 10 duels' },
  { id: 'week-warrior', name: 'Week Warrior', icon: '📅', description: 'Maintain a 7-day streak' },
  { id: 'rising-star', name: 'Rising Star', icon: '⭐', description: 'Reach level 10' },
  { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', description: 'Complete a challenge in under 2 minutes' },
];

export default function Profile() {
  const [stats, setStats] = useState(userStore.getStats());

  useEffect(() => {
    const unsubscribe = userStore.subscribe(() => {
      setStats(userStore.getStats());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const progress = userStore.getXPProgress();
  const xpToNext = userStore.getXPToNextLevel();

  return (
    <div className="page profile-page">
      <motion.div 
        className="profile-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.div 
          className="avatar"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          🦆
        </motion.div>
        <div className="profile-info">
          <h1>{stats.username}</h1>
          <p className="level-badge">Level {stats.level} • {stats.totalXP.toLocaleString()} Total XP</p>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="xp-text">{xpToNext} XP to Level {stats.level + 1}</p>
        </div>
      </motion.div>

      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>{stats.challengesSolved}</h3>
          <p>Challenges Solved</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>{stats.duelsWon}</h3>
          <p>Duels Won</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>{stats.badges.length}</h3>
          <p>Badges Earned</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>{stats.streak}</h3>
          <p>Day Streak 🔥</p>
        </motion.div>
      </div>

      <div className="badges-section">
        <h2>🏅 Badges</h2>
        <div className="badges-grid">
          {badgeData.map((badge, idx) => {
            const earned = stats.badges.includes(badge.id);
            return (
              <motion.div 
                key={badge.id} 
                className={`badge-card ${earned ? 'earned' : 'locked'}`}
                whileHover={{ scale: earned ? 1.1 : 1 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                title={badge.description}
              >
                <div className="badge-icon">{badge.icon}</div>
                <p className="badge-name">{badge.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
