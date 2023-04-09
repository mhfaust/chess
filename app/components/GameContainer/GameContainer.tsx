'use client'

import { createGameStore, gameContext, GameStore } from './gameContext';
import { ReactNode, useEffect, useRef } from 'react';

type GameContainerProps = { 
  children: ReactNode,
  initialGamePlay?: string,
  initialPosition?: number | 'last'
}

export const GameContainer = ({ 
  children,
  initialGamePlay = '',
  initialPosition = 0
}: GameContainerProps) => {
  const gameStoreRef = useRef<GameStore>();

  if(!gameStoreRef.current){
    gameStoreRef.current = createGameStore();
  }

  useEffect(() => {

  }, []);

  return (
    <gameContext.Provider value={gameStoreRef.current}>
      {children}
    </gameContext.Provider>
  )
}
