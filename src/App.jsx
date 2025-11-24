import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import './Style.css';

// Sounds
const audioFiles = {
  add: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3'),
  success: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-confirmation-tone-2867.mp3'),
  delete: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-trash-bin-lid-close-424.mp3')
};

export default function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("karma_tasks")) || []);
  const [showKarmaMsg, setShowKarmaMsg] = useState(false); // State for Karma Animation
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ msg: null, type: '' });

  useEffect(() => localStorage.setItem("karma_tasks", JSON.stringify(tasks)), [tasks]);
  useEffect(() => document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light'), [darkMode]);

  const playSound = (type) => {
    try { audioFiles[type].cloneNode(true).play().catch(() => {}); } catch(e){}
  };

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: null, type: '' }), 3000);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    showToast("Added to your Karma!", "success");
    playSound('add');
  };

  const updateTask = (id, updatedFields) => {
    if (updatedFields.completed) {
      playSound('success');
      showToast("Objective Achieved!", "success");
    }
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    showToast("Task Removed", "delete");
    playSound('delete');
  };

  // Filter Logic
  const [filter, setFilter] = useState("all");
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="App">
      <header>
        <div className="brand-container" onClick={() => setShowKarmaMsg(!showKarmaMsg)}>
          <h1 className="brand-title">K.A.R.M.A.</h1>
          <p style={{fontSize:'12px', color:'var(--text-muted)'}}>Tap to Explore Karma</p>
          
          {/* Animated Karma Meaning */}
          {showKarmaMsg && (
            <div className="karma-box">
              <div className="karma-item"><span>K</span> Knowledge</div>
              <div className="karma-item"><span>A</span> Action</div>
              <div className="karma-item"><span>R</span> Review</div>
              <div className="karma-item"><span>M</span> Management</div>
              <div className="karma-item"><span>A</span> Achievement</div>
            </div>
          )}
        </div>

        <div style={{display:'flex', gap:'8px'}}>
           <button style={{background:'none', border:'none', fontSize:'22px', cursor:'pointer'}} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <TaskForm addTask={addTask} />

      {/* Simplified Controls for Mobile */}
      <div style={{display:'flex', gap:'10px', marginBottom:'20px', overflowX:'auto', paddingBottom:'5px'}}>
        {['all', 'active', 'completed'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            style={{
              padding:'6px 16px', borderRadius:'20px', border:'1px solid var(--text-muted)',
              background: filter === f ? 'var(--primary)' : 'transparent',
              color: filter === f ? 'white' : 'var(--text-muted)', cursor:'pointer'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />

      {toast.msg && (
        <div className={`toast ${toast.type}`}>
           {toast.type === 'success' ? '🚀' : toast.type === 'delete' ? '🗑️' : 'ℹ️'}
           {toast.msg}
        </div>
      )}
    </div>
  );
}