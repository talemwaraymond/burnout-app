/*import React, { useEffect, useState } from 'react';

const Notifications = ({ burnoutScore }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (burnoutScore > 50) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [burnoutScore]);

  return (
    <>
      {showNotification && (
        <div className="notification">
          <p>⚠️ Warning: Your burnout score is high. Consider taking action.</p>
        </div>
      )}
    </>
  );
};

export default Notifications;*/

// Notifications.js
import React, { useEffect } from 'react';

function Notifications({ burnoutScore }) {
  useEffect(() => {
    if (burnoutScore > 80) {
      alert('⚠️ High Burnout Risk! Please consult a professional.');
    } else if (burnoutScore > 50) {
      alert('🛑 Moderate Burnout Risk. Consider stress-reducing activities.');
    } else if (burnoutScore > 20) {
      alert('⚠️ Early Signs of Burnout. Try taking regular breaks.');
    } else if (burnoutScore !== null) {
      alert('✅ You are doing great! Keep up the good balance.');
    }
  }, [burnoutScore]);

  return (
    <div className="notifications">
      <p>
        {burnoutScore >= 80
          ? '⚠️ Immediate action recommended! Consult a professional.'
          : burnoutScore >= 50
          ? '🛑 Moderate burnout risk! Consider professional help.'
          : burnoutScore >= 20
          ? '⚠️ Early signs of burnout. Stay cautious.'
          : '✅ You are doing great!'}
      </p>
    </div>
  );
}

export default Notifications;

