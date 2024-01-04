// src/components/Task.js
import React, { useState } from 'react';

const Task = ({ taskId, text, completed, editTask, deleteTask }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleToggleEdit = () => {
    setEditing(!isEditing);
    setEditedText(text);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== '') {
      editTask(taskId, editedText, completed);
      setEditing(false);
    }
  };

  const handleCheckboxChange = () => {
    editTask(taskId, text, !completed);
  };

  return (
    <div className={completed ? 'task-completed': 'task'}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </>
      ) : (
        <>
          <input className='checkbox'
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
          />
          <span className={completed ? 'completed' : ''}>{text}</span>
          <div className='icons-con'>
          <i onClick={handleToggleEdit} class="uil uil-pen"></i>
          <i onClick={() => deleteTask(taskId)} class="uil uil-trash-alt"></i>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
