import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from './components/Header';
import Card from './components/Card';

import './App.css';

import { useCardList } from './components/Hooks/useListCards';

function App() {
  // usando estados e função do Hook
  const { cardList, handleOnDragEnd, setDefaultList, toggleCardVisibility } = useCardList();

  return (
    <div className='App'>
      <Header />

      <p>Arraste os items na posição que deseja</p>

      <button onClick={() => setDefaultList()}>Lista Padrão</button>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='card'>
          {(provided) => (
            <ul className='cardList' {...provided.droppableProps} ref={provided.innerRef}>
              {cardList.map(({ cardNumber, name, isHidden }, index) => {
                return (
                  <Draggable key={cardNumber} draggableId={cardNumber} index={index}>
                    {(provided) => (
                      <Card
                        providedDnd={provided}
                        cardNumber={cardNumber}
                        name={name}
                        isHidden={isHidden}
                        toggleHidden={toggleCardVisibility}
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
