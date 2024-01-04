// src/App.js
import './App.css'
// src/App.js
import TaskCard from './components/TaskCard';

// src/App.js
import React, { useState } from 'react';


const App = () => {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const [error, setError] = useState('');

  const addCard = () => {
    if (newCardName.trim() === '') {
      setError('Card name cannot be empty');
      return;
    }

    if (cards.some(card => card.title === newCardName)) {
      setError('Card with the same name already exists');
      return;
    }

    setCards([...cards, { title: newCardName, tasks: [] }]);
    setNewCardName('');
    setError('');
  };

  const deleteCard = (cardTitle) => {
    setCards(cards.filter(card => card.title !== cardTitle));
  };

  const addTask = (cardTitle, taskText) => {
    setCards(cards.map(card => {
      if (card.title === cardTitle) {
        card.tasks.push({ id: Date.now(), text: taskText, completed: false });
      }
      return card;
    }));
  };

  const deleteTask = (taskId) => {
    setCards(cards.map(card => {
      card.tasks = card.tasks.filter(task => task.id !== taskId);
      return card;
    }));
  };

  const editTask = (taskId, newText, completed) => {
    setCards(cards.map(card => {
      card.tasks = card.tasks.map(task => {
        if (task.id === taskId) {
          task.text = newText;
          task.completed = completed;
        }
        return task;
      });
      return card;
    }));
  };

  return (
    <div className="app">
      <h1>To-Do App</h1>
      <div className="card-input">
        <input
          type="text"
          placeholder="Add new card"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
        />
              {error && <div className="error-message">{error}</div>}
        <button onClick={addCard} type="add-button" className="add-button">
          <span className="button__text">Add Card</span>
          <span className="button__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
        </button>
      </div>

      <div className="card-list">
        {cards.map(card => (
          <TaskCard
            key={card.title}
            cardTitle={card.title}
            tasks={card.tasks}
            addTask={addTask}
            deleteCard={deleteCard}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
