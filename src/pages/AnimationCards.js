import React, { useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';

import { Animated } from 'react-animated-css';

import './AnimationCards.css';

export default function AnimationCards() {
  return (
    <div className='App'>
      <Header />

      <p>Arraste os items na posição que deseja</p>

      <div className='App'>
        <Animated animationIn='slideDownAndUpLoop' animationInDuration={2000}>
          <Card name='Teste' cardNumber='23423423' className='card' />
        </Animated>

        <Animated animationIn='slideUpAndDownLoop' animationInDuration={2000}>
          <Card name='Teste' cardNumber='23423423' className='card' />
        </Animated>
      </div>
    </div>
  );
}
