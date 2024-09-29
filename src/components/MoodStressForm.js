/*import React from 'react';

const MoodStressForm = ({ setMood, setStress }) => {
  return (
    <div className="tracking-section">
      <h2>Mood and Stress Tracking</h2>
      
      <label>
        Mood:
        <select onChange={(e) => setMood(e.target.value)}>
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
        <select onChange={(e) => setStress(e.target.value)}>
          <option value="">Select Stress Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </label>
    </div>
  );
};

export default MoodStressForm;

*/
// MoodStressForm.js
import React, { useState } from 'react';

function MoodStressForm({ setMood, setStress }) {
  const [moodInput, setMoodInput] = useState("");
  const [stressInput, setStressInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!moodInput || !stressInput) {
      alert("Please provide both mood and stress levels.");
      return;
    }

    // Update the App component state
    setMood(moodInput);
    setStress(stressInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Track Your Mood and Stress</h3>
      <div>
        <label>Mood:</label>
        <select value={moodInput} onChange={(e) => setMoodInput(e.target.value)}>
          <option value="">Select Mood</option>
          <option value="Good">Good</option>
          <option value="Neutral">Neutral</option>
          <option value="Bad">Bad</option>
        </select>
      </div>

      <div>
        <label>Stress:</label>
        <select value={stressInput} onChange={(e) => setStressInput(e.target.value)}>
          <option value="">Select Stress Level</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default MoodStressForm;
