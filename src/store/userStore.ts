interface UserStats {
  username: string;
  level: number;
  xp: number;
  totalXP: number;
  challengesSolved: number;
  duelsWon: number;
  duelsLost: number;
  badges: string[];
  streak: number;
  lastActive: string;
}

const XP_PER_LEVEL = 500;

class UserStore {
  private stats: UserStats;
  private listeners: Set<() => void> = new Set();

  constructor() {
    const saved = localStorage.getItem('codingDucksUser');
    this.stats = saved ? JSON.parse(saved) : {
      username: 'CodeWarrior',
      level: 1,
      xp: 0,
      totalXP: 0,
      challengesSolved: 0,
      duelsWon: 0,
      duelsLost: 0,
      badges: [],
      streak: 0,
      lastActive: new Date().toISOString()
    };
    this.updateStreak();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener());
    localStorage.setItem('codingDucksUser', JSON.stringify(this.stats));
  }

  private updateStreak() {
    const lastActive = new Date(this.stats.lastActive);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day, keep streak
    } else if (daysDiff === 1) {
      // Next day, increment streak
      this.stats.streak++;
    } else {
      // Missed days, reset streak
      this.stats.streak = 1;
    }
    
    this.stats.lastActive = now.toISOString();
  }

  getStats() {
    return { ...this.stats };
  }

  addXP(amount: number): { leveledUp: boolean; newLevel?: number } {
    this.stats.xp += amount;
    this.stats.totalXP += amount;
    
    let leveledUp = false;
    let newLevel = this.stats.level;
    
    while (this.stats.xp >= XP_PER_LEVEL) {
      this.stats.xp -= XP_PER_LEVEL;
      this.stats.level++;
      leveledUp = true;
      newLevel = this.stats.level;
    }
    
    this.updateStreak();
    this.notify();
    
    return { leveledUp, newLevel };
  }

  solveChallenge(challengeId: number) {
    this.stats.challengesSolved++;
    this.checkBadges();
    this.notify();
  }

  winDuel() {
    this.stats.duelsWon++;
    this.checkBadges();
    this.notify();
  }

  loseDuel() {
    this.stats.duelsLost++;
    this.notify();
  }

  private checkBadges() {
    const newBadges: string[] = [];
    
    if (this.stats.challengesSolved >= 1 && !this.stats.badges.includes('first-steps')) {
      newBadges.push('first-steps');
    }
    if (this.stats.challengesSolved >= 10 && !this.stats.badges.includes('problem-solver')) {
      newBadges.push('problem-solver');
    }
    if (this.stats.challengesSolved >= 50 && !this.stats.badges.includes('coding-master')) {
      newBadges.push('coding-master');
    }
    if (this.stats.duelsWon >= 1 && !this.stats.badges.includes('first-blood')) {
      newBadges.push('first-blood');
    }
    if (this.stats.duelsWon >= 10 && !this.stats.badges.includes('duel-champion')) {
      newBadges.push('duel-champion');
    }
    if (this.stats.streak >= 7 && !this.stats.badges.includes('week-warrior')) {
      newBadges.push('week-warrior');
    }
    if (this.stats.level >= 10 && !this.stats.badges.includes('rising-star')) {
      newBadges.push('rising-star');
    }
    
    this.stats.badges.push(...newBadges);
    return newBadges;
  }

  getXPProgress() {
    return (this.stats.xp / XP_PER_LEVEL) * 100;
  }

  getXPToNextLevel() {
    return XP_PER_LEVEL - this.stats.xp;
  }
}

export const userStore = new UserStore();
