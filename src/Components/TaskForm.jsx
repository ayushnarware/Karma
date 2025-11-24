import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask({ text, priority, category, dueDate, completed: false });
    setText('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* 1. Main Text Input - Takes 2 units of space */}
      <input 
        className="form-input" 
        style={{ gridColumn: 'span 2' }} // Special CSS Grid span
        type="text" 
        placeholder="Add a new task..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      
      {/* 2. Controls */}
      <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">🔴 High</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Low">🟢 Low</option>
      </select>

      <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">💼 Work</option>
        <option value="Personal">🏠 Personal</option>
        <option value="Study">📚 Study</option>
      </select>

      <input 
        type="date" 
        className="form-input" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
      />

      <button type="submit" className="add-btn">Add +</button>
    </form>
  );
}