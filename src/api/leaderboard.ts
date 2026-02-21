import { userStore } from '../store/userStore';

interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  xp: number;
  badges: number;
  isCurrentUser?: boolean;
}

// Simulated leaderboard data
const generateLeaderboard = (): LeaderboardEntry[] => {
  const currentUser = userStore.getStats();
  
  const mockUsers = [
    { username: 'DuckMaster', level: 42, xp: 21000, badges: 28 },
    { username: 'CodeNinja', level: 38, xp: 19000, badges: 24 },
    { username: 'DevQueen', level: 35, xp: 17500, badges: 22 },
    { username: 'ByteWarrior', level: 33, xp: 16500, badges: 20 },
    { username: 'ScriptKid', level: 30, xp: 15000, badges: 18 },
    { username: 'AlgoWizard', level: 28, xp: 14000, badges: 16 },
    { username: 'PixelPusher', level: 25, xp: 12500, badges: 14 },
    { username: 'DataDragon', level: 23, xp: 11500, badges: 12 },
    { username: 'LogicLord', level: 20, xp: 10000, badges: 10 },
    { username: 'SyntaxSage', level: 18, xp: 9000, badges: 9 },
  ];

  // Insert current user into leaderboard
  const allUsers = [
    ...mockUsers,
    { 
      username: currentUser.username, 
      level: currentUser.level, 
      xp: currentUser.totalXP, 
      badges: currentUser.badges.length 
    }
  ];

  // Sort by XP
  allUsers.sort((a, b) => b.xp - a.xp);

  // Add ranks and mark current user
  return allUsers.map((user, index) => ({
    rank: index + 1,
    username: user.username,
    level: user.level,
    xp: user.xp,
    badges: user.badges,
    isCurrentUser: user.username === currentUser.username
  }));
};

export const getLeaderboard = (): Promise<LeaderboardEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateLeaderboard());
    }, 500);
  });
};
