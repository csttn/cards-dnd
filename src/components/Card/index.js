import React, { useState } from 'react';

import './styles.css';

import { useCardList } from '../Hooks/useListCards';

export default function Card({ providedDnd, isHidden, name, id }) {
  const { toggleCardVisibility } = useCardList();

  const [hidden, updateHidden] = useState(isHidden);

  function toggleHidden() {
    updateHidden(!hidden);
    toggleCardVisibility(id);
  }

  return (
    <div
      className='card'
      {...providedDnd.draggableProps}
      ref={providedDnd.innerRef}
      {...providedDnd.dragHandleProps}
    >
      <button className={`cardButton ${hidden ? 'cardButtonHidden' : ''}`} onClick={toggleHidden}>
        {hidden ? '+' : '-'}
      </button>
      <div className={`cardContent ${hidden ? 'cardContentHidden' : ''}`}>
        <p>{name}</p>
      </div>
    </div>
  );
}
