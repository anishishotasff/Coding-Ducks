# 🦆 Coding Ducks

Your coding dojo — where you level up your skills, battle in real-time code duels, and earn badges like a true code warrior.

## 🎮 Features

### 🥋 Training Dojo
- 10+ coding challenges across Easy, Medium, and Hard difficulties
- Real-time code execution with test cases
- Live timer tracking your solve speed
- Instant feedback with animated test results
- XP rewards and combo system

### 📊 Progress Tracking
- Real-time XP and level system
- Persistent progress saved in localStorage
- Daily streak tracking
- Detailed statistics dashboard
- Progress bars with smooth animations

### 🏅 Achievement System
- 8+ unlockable badges
- Achievement notifications with confetti
- Speed Demon badge for fast solves
- Combo multipliers for consecutive wins
- Badge showcase on profile

### 🏆 Dynamic Leaderboard
- Real-time rankings based on total XP
- Your position highlighted with glow effect
- Refresh to see updated standings
- Animated entry transitions

### 🎨 Visual Effects
- Particle background animation
- Confetti celebrations on challenge completion
- Smooth page transitions with Framer Motion
- Floating duck logo animation
- Glowing effects and hover animations
- Toast notifications for achievements

### 🔊 Sound Effects
- Success sounds for passing tests
- Error sounds for failures
- Click feedback
- Level-up fanfare
- Web Audio API powered

### ⚔️ Code Duels (Coming Soon)
- Real-time battles with other coders
- Live opponent matching
- Duel statistics tracking

## 🛠️ Tech Stack

- React 18
- TypeScript
- React Router
- Vite
- Framer Motion (animations)
- Canvas Confetti (celebrations)
- React Hot Toast (notifications)
- Web Audio API (sounds)
- LocalStorage (persistence)

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to http://localhost:5173

## 🎯 How to Play

1. Visit the **Dojo** to browse coding challenges
2. Click **Start** on any challenge to begin
3. Write your solution in the code editor
4. Click **Run Code** to test against test cases
5. Earn XP and badges for completing challenges
6. Track your progress on the **Profile** page
7. Compete on the **Leaderboard**

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ChallengeEditor.tsx
│   ├── Confetti.tsx
│   ├── XPGain.tsx
│   ├── AchievementPopup.tsx
│   └── ParticleBackground.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Dojo.tsx
│   ├── Duels.tsx
│   ├── Leaderboard.tsx
│   └── Profile.tsx
├── store/              # State management
│   └── userStore.ts
├── utils/              # Utilities
│   └── sounds.ts
├── api/                # API simulation
│   └── leaderboard.ts
├── App.tsx             # Main app
├── App.css             # Styles
└── main.tsx            # Entry point
```

## 🎨 Features Breakdown

### Challenge System
- Function execution in browser
- Multiple test cases per challenge
- Real-time validation
- Error handling and display

### Progression System
- 500 XP per level
- Persistent user stats
- Badge unlock conditions
- Streak maintenance

### Animation System
- Page transitions
- Card hover effects
- Confetti on success
- Particle background
- Smooth progress bars

## 🔮 Future Enhancements

- Real backend with database
- Multiplayer duel system
- More challenge categories
- Code hints system
- Solution discussions
- Custom challenge creation
- Social features

Enjoy your coding journey! 🚀
