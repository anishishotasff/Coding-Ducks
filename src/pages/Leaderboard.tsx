import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLeaderboard } from '../api/leaderboard';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    const data = await getLeaderboard();
    setLeaderboardData(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="page leaderboard-page">
        <h1>🏆 Leaderboard</h1>
        <div className="loading">Loading rankings...</div>
      </div>
    );
  }

  return (
    <div className="page leaderboard-page">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        🏆 Leaderboard
      </motion.h1>
      <motion.p 
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Top code warriors of the dojo
      </motion.p>

      <motion.div 
        className="leaderboard-table"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="table-header">
          <span>Rank</span>
          <span>Warrior</span>
          <span>Level</span>
          <span>XP</span>
          <span>Badges</span>
        </div>
        {leaderboardData.map((user, idx) => (
          <motion.div 
            key={user.rank} 
            className={`table-row ${user.isCurrentUser ? 'current-user' : ''}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + idx * 0.05 }}
            whileHover={{ scale: 1.02, x: 10 }}
          >
            <span className="rank">
              {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
            </span>
            <span className="username">
              {user.username} {user.isCurrentUser && '(You)'}
            </span>
            <span className="level">Lvl {user.level}</span>
            <span className="xp">{user.xp.toLocaleString()} XP</span>
            <span className="badges">{user.badges} 🏅</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="btn btn-primary"
        style={{ marginTop: '2rem' }}
        onClick={loadLeaderboard}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🔄 Refresh Rankings
      </motion.button>
    </div>
  );
}
