import { useState } from 'react';
import { motion } from 'framer-motion';
import ChallengeEditor from '../components/ChallengeEditor';
import { soundManager } from '../utils/sounds';

const challenges = [
  { 
    id: 1, 
    title: 'Two Sum', 
    difficulty: 'Easy', 
    points: 10, 
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] }
    ]
  },
  { 
    id: 2, 
    title: 'Reverse String', 
    difficulty: 'Easy', 
    points: 10, 
    category: 'Strings',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    starterCode: `function reverseString(s) {
  // Your code here
  
}`,
    testCases: [
      { input: [['h','e','l','l','o']], expected: ['o','l','l','e','h'] },
      { input: [['H','a','n','n','a','h']], expected: ['h','a','n','n','a','H'] }
    ]
  },
  { 
    id: 3, 
    title: 'Palindrome Check', 
    difficulty: 'Easy', 
    points: 15, 
    category: 'Strings',
    description: 'Check if a given string is a palindrome (reads the same forwards and backwards).',
    starterCode: `function isPalindrome(s) {
  // Your code here
  
}`,
    testCases: [
      { input: ['racecar'], expected: true },
      { input: ['hello'], expected: false },
      { input: ['A man a plan a canal Panama'], expected: false }
    ]
  },
  { 
    id: 4, 
    title: 'Binary Search', 
    difficulty: 'Medium', 
    points: 25, 
    category: 'Algorithms',
    description: 'Given a sorted array of integers, implement binary search to find the target value.',
    starterCode: `function binarySearch(nums, target) {
  // Your code here
  
}`,
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 }
    ]
  },
  { 
    id: 5, 
    title: 'Find Maximum', 
    difficulty: 'Easy', 
    points: 10, 
    category: 'Arrays',
    description: 'Find the maximum number in an array of integers.',
    starterCode: `function findMax(nums) {
  // Your code here
  
}`,
    testCases: [
      { input: [[1,5,3,9,2]], expected: 9 },
      { input: [[-5,-2,-10,-1]], expected: -1 },
      { input: [[42]], expected: 42 }
    ]
  },
  { 
    id: 6, 
    title: 'Merge Sort', 
    difficulty: 'Medium', 
    points: 30, 
    category: 'Sorting',
    description: 'Implement the merge sort algorithm to sort an array of integers.',
    starterCode: `function mergeSort(arr) {
  // Your code here
  
}`,
    testCases: [
      { input: [[5,2,3,1]], expected: [1,2,3,5] },
      { input: [[5,1,1,2,0,0]], expected: [0,0,1,1,2,5] }
    ]
  },
  { 
    id: 7, 
    title: 'Valid Parentheses', 
    difficulty: 'Medium', 
    points: 25, 
    category: 'Stacks',
    description: 'Given a string containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    starterCode: `function isValid(s) {
  // Your code here
  
}`,
    testCases: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false }
    ]
  },
  { 
    id: 8, 
    title: 'Fibonacci DP', 
    difficulty: 'Hard', 
    points: 50, 
    category: 'DP',
    description: 'Calculate the nth Fibonacci number using dynamic programming.',
    starterCode: `function fibonacci(n) {
  // Your code here
  
}`,
    testCases: [
      { input: [2], expected: 1 },
      { input: [3], expected: 2 },
      { input: [4], expected: 3 },
      { input: [10], expected: 55 }
    ]
  },
  { 
    id: 9, 
    title: 'Longest Substring', 
    difficulty: 'Hard', 
    points: 50, 
    category: 'Strings',
    description: 'Find the length of the longest substring without repeating characters.',
    starterCode: `function lengthOfLongestSubstring(s) {
  // Your code here
  
}`,
    testCases: [
      { input: ['abcabcbb'], expected: 3 },
      { input: ['bbbbb'], expected: 1 },
      { input: ['pwwkew'], expected: 3 }
    ]
  },
  { 
    id: 10, 
    title: 'Climbing Stairs', 
    difficulty: 'Medium', 
    points: 30, 
    category: 'DP',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    starterCode: `function climbStairs(n) {
  // Your code here
  
}`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 }
    ]
  },
];

export default function Dojo() {
  const [filter, setFilter] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<typeof challenges[0] | null>(null);

  const filteredChallenges = filter === 'All' 
    ? challenges 
    : challenges.filter(c => c.difficulty === filter);

  if (selectedChallenge) {
    return (
      <ChallengeEditor 
        challenge={selectedChallenge} 
        onBack={() => setSelectedChallenge(null)}
      />
    );
  }

  return (
    <div className="page dojo-page">
      <h1>🥋 Training Dojo</h1>
      <p className="page-subtitle">Choose your challenge and sharpen your skills</p>

      <div className="filter-bar">
        {['All', 'Easy', 'Medium', 'Hard'].map(level => (
          <motion.button
            key={level}
            className={`filter-btn ${filter === level ? 'active' : ''}`}
            onClick={() => {
              setFilter(level);
              soundManager.playClick();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {level}
          </motion.button>
        ))}
      </div>

      <div className="challenges-grid">
        {filteredChallenges.map((challenge, idx) => (
          <motion.div 
            key={challenge.id} 
            className="challenge-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="challenge-header">
              <h3>{challenge.title}</h3>
              <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className="challenge-category">{challenge.category}</p>
            <div className="challenge-footer">
              <span className="points">+{challenge.points} XP</span>
              <motion.button 
                className="btn btn-small"
                onClick={() => {
                  setSelectedChallenge(challenge);
                  soundManager.playClick();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Start
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
