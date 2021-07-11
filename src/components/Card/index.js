import React, { useState, useEffect } from 'react';

import './styles.css';

export default function Card({ provided, isHidden, name, id, onChangeHidden }) {
  const [hidden, updateHidden] = useState(isHidden);

  function toggleHidden() {
    updateHidden(!hidden);
    onChangeHidden(id);
  }

  return (
    <div className='card' {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
      <button className={`cardButton ${hidden ? '' : 'cardButtonHidden'}`} onClick={toggleHidden}>
        {hidden ? '-' : '+'}
      </button>
      <div className={`cardContent ${hidden ? '' : 'cardContentHidden'}`}>
        <p>{name}</p>
      </div>
    </div>
  );
}
