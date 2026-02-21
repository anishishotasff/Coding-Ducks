import { useState } from 'react';

const activeDuels = [
  { id: 1, opponent: 'CodeNinja42', challenge: 'Array Manipulation', status: 'waiting' },
  { id: 2, opponent: 'DevMaster99', challenge: 'String Algorithms', status: 'in-progress' },
];

export default function Duels() {
  const [searching, setSearching] = useState(false);

  const handleFindDuel = () => {
    setSearching(true);
    setTimeout(() => setSearching(false), 2000);
  };

  return (
    <div className="page duels-page">
      <h1>⚔️ Duel Arena</h1>
      <p className="page-subtitle">Battle other code warriors in real-time challenges</p>

      <div className="duel-actions">
        <button 
          className="btn btn-primary btn-large" 
          onClick={handleFindDuel}
          disabled={searching}
        >
          {searching ? '🔍 Finding Opponent...' : '🎯 Find Duel'}
        </button>
      </div>

      <div className="duels-section">
        <h2>Active Duels</h2>
        {activeDuels.length > 0 ? (
          <div className="duels-list">
            {activeDuels.map(duel => (
              <div key={duel.id} className="duel-card">
                <div className="duel-info">
                  <h3>vs {duel.opponent}</h3>
                  <p>{duel.challenge}</p>
                </div>
                <div className="duel-status">
                  <span className={`status-badge ${duel.status}`}>
                    {duel.status === 'waiting' ? '⏳ Waiting' : '🔥 Live'}
                  </span>
                  <button className="btn btn-small">
                    {duel.status === 'waiting' ? 'Join' : 'Continue'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No active duels. Start one now!</p>
        )}
      </div>

      <div className="duel-stats">
        <div className="stat-box">
          <h3>12</h3>
          <p>Duels Won</p>
        </div>
        <div className="stat-box">
          <h3>5</h3>
          <p>Duels Lost</p>
        </div>
        <div className="stat-box">
          <h3>70%</h3>
          <p>Win Rate</p>
        </div>
      </div>
    </div>
  );
}
