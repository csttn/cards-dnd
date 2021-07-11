import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from './components/Header';
import Card from './components/Card';
import './App.css';

const cardsMocados = [
  {
    id: '1',
    name: 'card1',
    isHidden: true,
  },
  {
    id: '2',
    name: 'card2',
    isHidden: false,
  },
  {
    id: '3',
    name: 'card3',
    isHidden: false,
  },
];

function App() {
  const [cards, setCards] = useState(cardsMocados);

  function handleOnDragEnd(result) {
    console.log('---------BEFORE', cards);
    if (result.destination === null) {
      return;
    }
    const items = Array.from(cards);
    const [reorderdItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderdItem);

    setCards(items);
    console.log('---------AFTER', items);
  }

  function changeCardVisibility(id) {
    const cardUpdate = cards;

    const indexItem = cards.findIndex((card) => card.id === id);

    cardUpdate[indexItem].isHidden = !cardUpdate[indexItem].isHidden;
    setCards(cardUpdate);

    console.log('--------CHANGE VISIBILITY', cardUpdate[indexItem].isHidden);
  }

  return (
    <div className='App'>
      <Header />

      <p>Arraste os items na posição que deseja</p>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='card'>
          {(provided) => (
            <ul className='cardList' {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map(({ id, name, isHidden }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <Card
                        provided={provided}
                        id={id}
                        name={name}
                        isHidden={isHidden}
                        onChangeHidden={changeCardVisibility}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
