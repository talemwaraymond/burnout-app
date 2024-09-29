/*import React, { useState } from 'react';

const MoodStressForm = ({ setMood, setStress }) => {
  const [mood, setLocalMood] = useState('');  // Local state to hold mood
  const [stress, setLocalStress] = useState('');  // Local state to hold stress

  // Function to store mood and stress in localStorage
  const storeTrackingData = (mood, stress) => {
    const existingData = JSON.parse(localStorage.getItem('trackingData')) || [];
    
    const newEntry = {
      mood,
      stress,
      date: new Date().toLocaleDateString() // Stores current date
    };
    
    // Add new entry to existing data
    existingData.push(newEntry);
    
    // Update localStorage
    localStorage.setItem('trackingData', JSON.stringify(existingData));
  };

  // Handle form submission or selection change
  const handleSubmit = (e) => {
    e.preventDefault();
    setMood(mood);  // Update the parent component's state for mood
    setStress(stress);  // Update the parent component's state for stress
    storeTrackingData(mood, stress);  // Store mood and stress in localStorage
  };

  return (
    <div className="tracking-section">
      <h2>Mood and Stress Tracking</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          Mood:
          <select value={mood} onChange={(e) => setLocalMood(e.target.value)}>
            <option value="">Select Mood</option>
            <option value="Great">Great</option>
            <option value="Good">Good</option>
            <option value="Okay">Okay</option>
            <option value="Tired">Tired</option>
            <option value="Stressed">Stressed</option>
            <option value="Bad">Bad</option>
            <option value="Angry">Angry</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
          </select>
        </label>
        
        <label>
          Stress Level:
          <select value={stress} onChange={(e) => setLocalStress(e.target.value)}>
            <option value="">Select Stress Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MoodStressForm;
*/

// MoodStressChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Import the chart.js library

function MoodStressChart({ mood, stress, burnoutScore }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Mood',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Stress',
        data: [],
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'Burnout Score',
        data: [],
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      }
    ],
  });

  useEffect(() => {
    // Add new data points when mood, stress, or burnoutScore is updated
    setChartData((prevData) => ({
      labels: [...prevData.labels, new Date().toLocaleTimeString()],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, mapMoodToNumber(mood)],
        },
        {
          ...prevData.datasets[1],
          data: [...prevData.datasets[1].data, mapStressToNumber(stress)],
        },
        {
          ...prevData.datasets[2],
          data: [...prevData.datasets[2].data, burnoutScore || 0],
        },
      ],
    }));
  }, [mood, stress, burnoutScore]);

  // Utility to convert mood to a number (for charting purposes)
  const mapMoodToNumber = (mood) => {
    switch (mood) {
      case 'Good': return 1;
      case 'Neutral': return 2;
      case 'Bad': return 3;
      default: return 0;
    }
  };

  // Utility to convert stress to a number (for charting purposes)
  const mapStressToNumber = (stress) => {
    switch (stress) {
      case 'Low': return 1;
      case 'Moderate': return 2;
      case 'High': return 3;
      default: return 0;
    }
  };

  return (
    <div className="chart-container">
      <h3>Mood & Stress Tracker (Real-Time)</h3>
      <Line data={chartData} />
    </div>
  );
}

export default MoodStressChart;

