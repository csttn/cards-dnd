import { useState, useEffect } from 'react';

const cardListDefault = [
  {
    name: 'card1',
    cardNumber: '1234',
    isHidden: true,
  },
  {
    name: 'card2',
    cardNumber: '4567',
    isHidden: false,
  },
];

export function useCardList() {
  const [cardList, setCardList] = useState([]);

  //  função resposável por retornar o valor inicial da lista
  //  seja lista salva no localStorage ou lista padrão.
  useEffect(() => {
    function setDefaultValue() {
      const cardLisCustom = loadCardList();
      if (cardLisCustom) {
        setCardList(cardLisCustom);
      } else {
        setCardList(cardListDefault);
      }
    }
    setDefaultValue();
  }, []);

  //  função responsável por buscar lista armazenada no localStorage
  function loadCardList() {
    const cardList = localStorage.getItem('@idUserCardList');
    return JSON.parse(cardList);
  }

  //  função responsável por atualizar lista no localStorage
  function saveCardList(updateCardList) {
    setCardList(updateCardList);
    localStorage.setItem('@idUserCardList', JSON.stringify(updateCardList));
  }

  const loopMoveCard = () => {
    const newCardList = [...cardList];
    newCardList.reverse();
    setCardList(newCardList);
  };

  // função responsável por salvar atualizações da lista
  function handleOnDragEnd(result) {
    if (result.destination === null) {
      return;
    }
    const items = Array.from(cardList);
    const [reorderdItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderdItem);

    saveCardList(items);
  }

  //  função que atualiza a visibilidade dos cartoes
  function toggleCardVisibility(cardNumber) {
    const cardUpdate = cardList;
    const indexItem = cardList.findIndex((card) => card.cardNumber === cardNumber);
    cardUpdate[indexItem].isHidden = !cardUpdate[indexItem].isHidden;

    saveCardList(cardUpdate);
  }

  //  redefinição de lista para padrão
  function setDefaultList() {
    setCardList(cardListDefault);
    //  salvando ação do usuario ao setar valor padrão da lista no localStorage
    saveCardList(cardListDefault);
    window.location.reload();
  }

  return {
    cardList,
    cardListDefault,
    saveCardList,
    handleOnDragEnd,
    toggleCardVisibility,
    setDefaultList,
    loopMoveCard,
  };
}
