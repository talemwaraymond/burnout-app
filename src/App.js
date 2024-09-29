// App.js (refactored)
import React, { useState, useEffect } from 'react';
import './App.css';

// Importing components
import MoodStressForm from './components/MoodStressForm';
import MoodStressChart from './components/MoodStressChart';
import Notifications from './components/Notifications';
import AnalyticsReports from './components/AnalyticsReports';

const quizQuestions = [
  { question: "How often do you feel emotionally drained by your work?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { question: "How often do you feel physically exhausted by your work?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { question: "How often do you feel frustrated by your job?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { question: "Do you find it hard to concentrate on tasks at work?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { question: "How satisfied are you with your work-life balance?", options: ["Very satisfied", "Somewhat satisfied", "Neutral", "Somewhat unsatisfied", "Very unsatisfied"] }
];

const getRecommendations = (score) => {
  if (score < 20) return "You're doing great! Keep up the balance between work and personal life.";
  else if (score < 50) return "Showing early signs of burnout. Try incorporating relaxation exercises and regular breaks.";
  else if (score < 80) return "Moderate burnout risk. Consider stress-reducing activities or professional help.";
  else return "High burnout risk! Immediate action recommended. Consult a professional.";
};

function App() {
  // States for tracking quiz progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [burnoutScore, setBurnoutScore] = useState(null);
  const [recommendations, setRecommendations] = useState("");

  // Mood and Stress tracking state
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState("");

  // Data storage and retrieval from localStorage
  useEffect(() => {
    // Retrieve stored data on load
    const storedScore = localStorage.getItem('burnoutScore');
    const storedMood = localStorage.getItem('mood');
    const storedStress = localStorage.getItem('stress');
    
    if (storedScore) setBurnoutScore(JSON.parse(storedScore));
    if (storedMood) setMood(storedMood);
    if (storedStress) setStress(storedStress);
  }, []);

  useEffect(() => {
    // Store data whenever it changes
    if (burnoutScore) localStorage.setItem('burnoutScore', JSON.stringify(burnoutScore));
    if (mood) localStorage.setItem('mood', mood);
    if (stress) localStorage.setItem('stress', stress);
  }, [burnoutScore, mood, stress]);

  // Handle user answers and calculate score
  const handleAnswerSelection = (answer) => {
    const updatedAnswers = [...userAnswers, answer];
    setUserAnswers(updatedAnswers);
    
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      calculateBurnoutScore(updatedAnswers);
      setQuizFinished(true);
    }
  };

  const calculateBurnoutScore = (answers) => {
    const score = answers.reduce((acc, answer) => {
      switch(answer) {
        case "Never":
        case "Very satisfied":
          return acc + 1;
        case "Rarely":
        case "Somewhat satisfied":
          return acc + 2;
        case "Sometimes":
        case "Neutral":
          return acc + 3;
        case "Often":
        case "Somewhat unsatisfied":
          return acc + 4;
        case "Always":
        case "Very unsatisfied":
          return acc + 5;
        default:
          return acc;
      }
    }, 0);

    let adjustedScore = score;

    // Factor in mood and stress
    if (stress === "High" || mood === "Bad") {
      adjustedScore += 10;
    }

    setBurnoutScore(adjustedScore);
    setRecommendations(getRecommendations(adjustedScore));
  };

  const restartQuiz = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setBurnoutScore(null);
    setRecommendations("");
    setMood("");
    setStress("");
  };

  return (
    <div className="App">
      <h1>Burnout Assessment App</h1>

      {/* Quiz Section */}
      {!quizFinished ? (
        <div className="quiz-section">
          <h2>Burnout Assessment Quiz</h2>
          <p>{quizQuestions[currentQuestionIndex].question}</p>
          {quizQuestions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerSelection(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="results-section">
          <h2>Your Burnout Score: {burnoutScore}</h2>
          <p>{recommendations}</p>
          <button onClick={restartQuiz}>Retake Quiz</button>
        </div>
      )}

      {/* Mood and Stress Tracking Form */}
      <MoodStressForm setMood={setMood} setStress={setStress} />

      {/* Notifications */}
      <Notifications burnoutScore={burnoutScore} />

      {/* Real-time Graphical Representation */}
      <MoodStressChart mood={mood} stress={stress} burnoutScore={burnoutScore} />

      {/* Analytics Reports */}
      <AnalyticsReports mood={mood} stress={stress} burnoutScore={burnoutScore} />
    </div>
  );
}

export default App;
