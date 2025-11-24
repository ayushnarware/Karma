import React from 'react';

export default function ProgressTracker({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getMessage = () => {
    if (progress === 0) return "Let's get started! 🚀";
    if (progress === 100) return "All done! You are amazing! 🎉";
    if (progress >= 50) return "Halfway there! Keep going! 💪";
    return "Good start! Keep moving. 🔥";
  };

  return (
    <div className="progress-tracker">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <strong>Your Progress</strong>
        <span>{progress}%</span>
      </div>
      
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="quote">{getMessage()}</p>
    </div>
  );
}