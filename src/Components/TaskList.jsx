import React from 'react';

export default function TaskList({ tasks, updateTask, deleteTask }) {
  if (tasks.length === 0) return <div style={{textAlign:'center', marginTop: '40px', color:'#94a3b8'}}>No tasks yet. Create some Karma! ✨</div>;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const taskDate = new Date(dateString);
    const today = new Date();
    taskDate.setHours(0,0,0,0); today.setHours(0,0,0,0);
    const diff = (taskDate - today) / (1000 * 60 * 60 * 24);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    return dateString; // e.g. 2023-11-25
  };

  const isOverdue = (dateString) => {
    if(!dateString) return false;
    return new Date(dateString) < new Date().setHours(0,0,0,0);
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li 
          key={task.id} 
          className={`task-item ${task.completed ? 'completed' : ''}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="task-left">
            {/* Round Custom Checkbox */}
            <div className="custom-checkbox" onClick={() => updateTask(task.id, { completed: !task.completed })}></div>

            <div className="task-content-group">
              <span className="task-title">{task.text}</span>
              
              {/* META BADGES ROW */}
              <div className="meta-row">
                
                {/* 1. Category Badge (Blue/Grey) */}
                <span className="meta-badge badge-cat">
                  📁 {task.category}
                </span>

                {/* 2. Priority Badge (Colored) */}
                <span className={`meta-badge badge-${task.priority}`}>
                   {task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢'} {task.priority}
                </span>

                {/* 3. Date Badge (If exists) */}
                {task.dueDate && (
                  <span className={`meta-badge badge-date ${isOverdue(task.dueDate) && !task.completed ? 'text-danger' : ''}`}>
                    🗓 {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Delete Button (Mobile responsive handled in CSS) */}
          <button 
            onClick={() => deleteTask(task.id)}
            style={{background:'none', border:'none', cursor:'pointer', fontSize:'18px', padding:'8px', color:'#ef4444', opacity: 0.8}}
            className="delete-btn-desktop"
            title="Delete Task"
          >
             🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}