import React, { useContext, useState, useEffect, createContext } from 'react';

const cardsDefault = [
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

const CardListContext = createContext({});

export function CardListProvider({ children }) {
  const [cardListDefault, setCardListDefault] = useState(cardsDefault);
  //    lista aser manipulada
  const [cardList, setCardList] = useState([]);

  //  função resposável por retornar o valor inicial da lista ao usuario
  //  seja lista salva no localStorage ou não
  useEffect(() => {
    function setDefaultValue() {
      const cardLisCustom = loadCardListCustom();
      if (cardLisCustom) {
        setCardList(cardLisCustom);
      } else {
        setCardList(cardListDefault);
      }
    }
    setDefaultValue();
  }, []);

  //  função responsável por buscar lista armazenada no localStorage
  function loadCardListCustom() {
    const cardList = localStorage.getItem('@idUserCardList');
    return JSON.parse(cardList);
  }

  //  função responsável por atualizar lista no localStorage
  function handleCardListCustom(updateCardList) {
    setCardList(updateCardList);
    localStorage.setItem('@idUserCardList', JSON.stringify(updateCardList));
  }

  return (
    <CardListContext.Provider value={{ cardList, cardListDefault, handleCardListCustom }}>
      {children}
    </CardListContext.Provider>
  );
}

//  função responsavel por retornar toda a lógica armazenada no contexto
export function useCardList() {
  const context = useContext(CardListContext);

  return context;
}
