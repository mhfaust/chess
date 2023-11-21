'use client'

import { createGameStore, gameContext, GameStore } from './gameContext';
import { useRef } from 'react';
import Game from '../Game/Game';

export type GameContainerProps = { 
  initialGamePlay?: string,
  initialPosition?: number | 'last',
  className?: string
}

const GameContainer = ({ 
  initialGamePlay = '',
  initialPosition = 0,
  className
}: GameContainerProps) => {
  const gameStoreRef = useRef<GameStore>();

  if(!gameStoreRef.current){
    gameStoreRef.current = createGameStore();
  }

  return (
    <gameContext.Provider value={gameStoreRef.current}>
      <Game 
        initialGamePlay={initialGamePlay}
        initialPosition={initialPosition}
        className={className}
      />
    </gameContext.Provider>
  )
}

export default GameContainer;
