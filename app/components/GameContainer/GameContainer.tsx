'use client'

import { createGameStore, gameContext, GameStore } from './gameContext';
import { ReactNode, useRef } from 'react';
import Game from '../Game/Game';

export type GameContainerProps = { 
  initialGamePlay?: string,
  initialPosition?: number | 'last'
}

export const GameContainer = ({ 
  initialGamePlay = '',
  initialPosition = 0
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
      />
    </gameContext.Provider>
  )
}
