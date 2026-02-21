import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/sounds';
import { userStore } from '../store/userStore';
import Confetti from './Confetti';
import XPGain from './XPGain';
import toast, { Toaster } from 'react-hot-toast';

interface TestCase {
  input: any[];
  expected: any;
}

interface Challenge {
  id: number;
  title: string;
  difficulty: string;
  points: number;
  description: string;
  starterCode: string;
  testCases: TestCase[];
}

interface Props {
  challenge: Challenge;
  onBack: () => void;
}

export default function ChallengeEditor({ challenge, onBack }: Props) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [combo, setCombo] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval: any;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [code, challenge]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running tests...\n');
    soundManager.playClick();
    
    setTimeout(() => {
      try {
        const results: any[] = [];
        let allPassed = true;

        challenge.testCases.forEach((testCase, index) => {
          try {
            const userFunction = new Function('return ' + code)();
            const result = userFunction(...testCase.input);
            const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
            
            results.push({
              index: index + 1,
              passed,
              input: testCase.input,
              expected: testCase.expected,
              actual: result
            });

            if (!passed) allPassed = false;
          } catch (error: any) {
            results.push({
              index: index + 1,
              passed: false,
              error: error.message
            });
            allPassed = false;
          }
        });

        setTestResults(results);
        
        if (allPassed) {
          soundManager.playSuccess();
          setTimerRunning(false);
          setOutput(`✅ All tests passed! You earned ${challenge.points} XP!\n⏱️ Time: ${formatTime(timer)}\n\n`);
          
          const { leveledUp, newLevel } = userStore.addXP(challenge.points);
          userStore.solveChallenge(challenge.id);
          
          setShowXP(true);
          setTimeout(() => setShowXP(false), 2000);
          
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          
          setCombo(prev => prev + 1);
          
          if (leveledUp) {
            soundManager.playLevelUp();
            toast.success(`🎉 Level Up! You're now level ${newLevel}!`, {
              duration: 5000,
              style: {
                background: '#4ade80',
                color: '#fff',
                fontWeight: 'bold'
              }
            });
          }
          
          if (timer < 120) {
            toast.success('⚡ Speed Demon! Completed in under 2 minutes!', {
              duration: 3000
            });
          }
          
          toast.success(`🔥 ${combo > 0 ? `${combo}x Combo! ` : ''}Challenge Complete!`, {
            duration: 3000
          });
        } else {
          soundManager.playError();
          setOutput(`❌ Some tests failed. Keep trying!\n\n`);
          setCombo(0);
        }
      } catch (error: any) {
        soundManager.playError();
        setOutput(`❌ Error: ${error.message}\n`);
        setTestResults([]);
        setCombo(0);
      }
      
      setIsRunning(false);
    }, 500);
  };

  return (
    <div className="page challenge-editor">
      <Toaster position="top-right" />
      <Confetti trigger={showConfetti} />
      <XPGain amount={challenge.points} show={showXP} />
      
      {combo > 1 && (
        <motion.div 
          className="combo-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          🔥 {combo}x COMBO!
        </motion.div>
      )}
      
      <div className="editor-header">
        <button className="btn btn-small" onClick={onBack}>← Back</button>
        <div className="challenge-title-section">
          <h2>{challenge.title}</h2>
          <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="header-stats">
          <motion.div 
            className="timer"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⏱️ {formatTime(timer)}
          </motion.div>
          <span className="points">+{challenge.points} XP</span>
        </div>
      </div>

      <div className="editor-layout">
        <div className="problem-section">
          <h3>Problem Description</h3>
          <p>{challenge.description}</p>
          
          <h3>Test Cases</h3>
          <div className="test-cases">
            {challenge.testCases.map((tc, idx) => (
              <div key={idx} className="test-case">
                <strong>Test {idx + 1}:</strong>
                <div>Input: {JSON.stringify(tc.input)}</div>
                <div>Expected: {JSON.stringify(tc.expected)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="code-section">
          <div className="code-header">
            <h3>Your Solution</h3>
            <motion.button 
              className="btn btn-primary" 
              onClick={runCode}
              disabled={isRunning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRunning ? '⏳ Running...' : '▶️ Run Code'}
            </motion.button>
          </div>
          
          <motion.textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          <div className="output-section">
            <h3>Output</h3>
            <pre className="output-display">{output}</pre>
            
            {testResults.length > 0 && (
              <div className="test-results">
                {testResults.map((result, idx) => (
                  <motion.div 
                    key={result.index} 
                    className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="result-header">
                      {result.passed ? '✅' : '❌'} Test {result.index}
                    </div>
                    {!result.passed && !result.error && (
                      <div className="result-details">
                        <div>Expected: {JSON.stringify(result.expected)}</div>
                        <div>Got: {JSON.stringify(result.actual)}</div>
                      </div>
                    )}
                    {result.error && (
                      <div className="result-error">Error: {result.error}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
