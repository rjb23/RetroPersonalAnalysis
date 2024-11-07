import React, { useState, useEffect } from 'react';
import { Terminal, User, Play, Rewind } from 'lucide-react';

const PersonalityAnalyzer = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, result
  const [userResponses, setUserResponses] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [analysis, setAnalysis] = useState('');
  
  const questions = [
    "What's your first name?",
    "What month were you born in?",
    "What's your favorite color?",
    "Do you prefer sunrise or sunset?",
    "Pick a number between 1-10:",
    "Choose an element: earth, water, fire, or air?",
    "What's your dream travel destination?"
  ];

  const zodiacSigns = {
    "january": "Aquarius - The Visionary",
    "february": "Pisces - The Dreamer",
    "march": "Aries - The Pioneer",
    "april": "Taurus - The Builder",
    "may": "Gemini - The Communicator",
    "june": "Cancer - The Nurturer",
    "july": "Leo - The Leader",
    "august": "Virgo - The Perfectionist",
    "september": "Libra - The Harmonizer",
    "october": "Scorpio - The Mystic",
    "november": "Sagittarius - The Adventurer",
    "december": "Capricorn - The Achiever"
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      generateAnalysis();
    }
  }, [timeLeft, gameState]);

  const generateAnalysis = () => {
    const zodiac = zodiacSigns[userResponses[1]?.toLowerCase()] || "Mystery Sign";
    const name = userResponses[0] || "Friend";
    const element = userResponses[5] || "unknown";
    const number = userResponses[4] || "0";
    
    setAnalysis(`
      ✨ ANALYSIS COMPLETE ✨
      
      Name: ${name}
      Your name resonates with ${element} energy, suggesting a ${element === 'fire' ? 'passionate' : element === 'water' ? 'deep' : element === 'air' ? 'free-spirited' : 'grounded'} nature.
      
      Zodiac: ${zodiac}
      
      Your chosen number (${number}) indicates ${parseInt(number) % 2 === 0 ? 'harmony and balance' : 'creativity and leadership'} in your personality.
      
      Your preference for ${userResponses[3]} reveals your ${userResponses[3] === 'sunrise' ? 'optimistic and proactive' : 'reflective and philosophical'} tendencies.
      
      Your dream destination of ${userResponses[6]} suggests you're ${userResponses[6]?.toLowerCase().includes('beach') ? 'seeking peace and tranquility' : 'craving adventure and discovery'}.
    `);
    setGameState('result');
  };

  const handleStart = () => {
    setGameState('playing');
    setTimeLeft(120);
    setUserResponses({});
    setCurrentQuestion(0);
  };

  const handleResponse = (response) => {
    setUserResponses(prev => ({...prev, [currentQuestion]: response}));
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-2xl p-8">
        {/* Retro Computer Frame */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border-4 border-pink-500">
          {/* Screen */}
          <div className="bg-black p-6 rounded-lg mb-4 min-h-[400px] border-2 border-blue-400 relative overflow-hidden">
            {gameState === 'start' && (
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
                  PERSONAL ANALYZER 3000
                </h1>
                <Terminal className="w-16 h-16 mx-auto mb-6 text-pink-500" />
                <button
                  onClick={handleStart}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center mx-auto gap-2"
                >
                  <Play size={20} />
                  START ANALYSIS
                </button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="space-y-4">
                <div className="flex justify-between text-green-400 mb-4">
                  <span>Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                  <span>Question {currentQuestion + 1}/{questions.length}</span>
                </div>
                
                {currentQuestion < questions.length ? (
                  <div>
                    <p className="text-white mb-4">{questions[currentQuestion]}</p>
                    <input
                      type="text"
                      className="w-full bg-gray-900 text-green-400 border border-green-500 rounded p-2 focus:outline-none focus:border-pink-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                          handleResponse(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      placeholder="Type your answer and press Enter..."
                    />
                  </div>
                ) : (
                  <div className="text-center text-green-400">
                    Processing analysis...
                  </div>
                )}
              </div>
            )}

            {gameState === 'result' && (
              <div className="space-y-4">
                <pre className="text-green-400 whitespace-pre-wrap font-mono">{analysis}</pre>
                <button
                  onClick={handleStart}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center mx-auto gap-2 mt-4"
                >
                  <Rewind size={20} />
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>

          {/* Computer Controls */}
          <div className="flex justify-center gap-4">
            <div className="w-4 h-4 rounded-full bg-pink-500"></div>
            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
            <div className="w-4 h-4 rounded-full bg-green-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityAnalyzer;
