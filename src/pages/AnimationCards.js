import React from 'react';
import Card from '../components/Card';

import { Animated } from 'react-animated-css';

import './AnimationCards.css';
import { useCardList } from '../components/Hooks/useListCards';

export default function AnimationCards() {
  const { toggleCardVisibility } = useCardList();
  return (
    <div className='App'>
      <Animated animationIn='slideDownAndUpLoop' animationInDuration={2000}>
        <Card name='Teste' cardNumber='1234' toggleHidden={toggleCardVisibility} />
      </Animated>
      <Animated animationIn='slideUpAndDownLoop' animationInDuration={2000}>
        <Card name='Teste' cardNumber='4567' toggleHidden={toggleCardVisibility} />
      </Animated>
    </div>
  );
}
