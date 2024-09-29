// AnalyticsReports.js
import React from 'react';

function AnalyticsReports({ mood, stress, burnoutScore }) {
  return (
    <div className="analytics-reports">
      <h3>Analytics Report</h3>
      <p><strong>Last Recorded Mood:</strong> {mood || 'N/A'}</p>
      <p><strong>Last Recorded Stress Level:</strong> {stress || 'N/A'}</p>
      <p><strong>Burnout Score:</strong> {burnoutScore !== null ? burnoutScore : 'N/A'}</p>

      <div className="report-summary">
        {burnoutScore >= 80 ? (
          <p>🚨 Your burnout risk is critically high! Immediate action is required.</p>
        ) : burnoutScore >= 50 ? (
          <p>⚠️ You're at moderate risk for burnout. Please take measures to reduce stress.</p>
        ) : (
          <p>✅ You have a low burnout risk! Keep maintaining a healthy balance.</p>
        )}
      </div>
    </div>
  );
}

export default AnalyticsReports;

