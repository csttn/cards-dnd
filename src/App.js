import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from './components/Header';
import Card from './components/Card';

import './App.css';

import { useCardList } from './components/Hooks/useListCards';

function App() {
  const [cards, setCards] = useState([]);

  // usando estados e função o Hook
  const { cardList, handleCardListCustom, cardListDefault } = useCardList();

  // Função responsável por inicializar a lista com os valores corretos, seja com localStorage ou lista padrão
  useEffect(() => {
    setCards(cardList);
  }, [cardList]);

  // função responsável por salvar atualizações da lista
  function handleOnDragEnd(result) {
    if (result.destination === null) {
      return;
    }
    const items = Array.from(cards);
    const [reorderdItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderdItem);

    setCards(items);
    handleCardListCustom(items);
  }

  //  redefinição de lista para padrão
  function setDefaultList() {
    setCards(cardListDefault);
    //  salvando ação do usuario ao setar valor padrão da lista no localStorage
    handleCardListCustom(cardListDefault);
    window.location.reload();
  }
  //  função que atualiza a visibilidade dos cartoes
  function changeCardVisibility(id) {
    const cardUpdate = cards;
    const indexItem = cards.findIndex((card) => card.id === id);
    cardUpdate[indexItem].isHidden = !cardUpdate[indexItem].isHidden;
    handleCardListCustom(cardUpdate);
  }

  return (
    <div className='App'>
      <Header />

      <p>Arraste os items na posição que deseja</p>

      <button onClick={() => setDefaultList()}>Lista Padrão</button>

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
