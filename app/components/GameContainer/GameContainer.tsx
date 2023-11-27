'use client'

import { createGameStore, gameContext, GameStore } from './gameContext';
import { useRef } from 'react';
import Game from '../Game/Game';
import { recordMove } from 'app/actions';
import { useParams } from 'next/navigation';

export type GameContainerProps = { 
  initialGamePlay?: string,
  initialPosition?: number | 'last',
  className?: string
}

const GameContainer = ({ 
  initialGamePlay = '',
  initialPosition = 0,
  className,
}: GameContainerProps) => {
  const gameStoreRef = useRef<GameStore>();
  const { id } = useParams<{ id: string }>()

  if(!gameStoreRef.current){
    gameStoreRef.current = createGameStore((gamePlay) => recordMove(id, gamePlay));
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
