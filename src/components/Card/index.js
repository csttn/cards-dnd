import React, { useState } from 'react';

import './styles.css';

export default function Card({ isHidden, name, cardNumber, toggleHidden }) {
  const [hidden, setHidden] = useState(isHidden);

  function toggleStateHidden() {
    setHidden((prevHidden) => !prevHidden);
    toggleHidden(cardNumber);
  }

  return (
    <div className='card'>
      <button
        className={`cardButton ${hidden ? 'cardButtonHidden' : ''}`}
        onClick={toggleStateHidden}
      >
        {hidden ? '+' : '-'}
      </button>
      <div className={`cardContent ${hidden ? 'cardContentHidden' : ''}`}>
        <p>{name}</p>
      </div>
    </div>
  );
}
