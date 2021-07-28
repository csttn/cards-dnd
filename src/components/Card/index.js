import React, { useState } from 'react';

import './styles.css';

export default function Card({ providedDnd, isHidden, name, cardNumber, toggleHidden }) {
  const [hidden, setHiden] = useState(isHidden);

  function toggleStateHidden() {
    setHiden((prevHidden) => !prevHidden);
    toggleHidden(cardNumber);
  }

  return (
    <div
      className='card'
      {...providedDnd.draggableProps}
      ref={providedDnd.innerRef}
      {...providedDnd.dragHandleProps}
    >
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
