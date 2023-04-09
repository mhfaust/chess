'use client'

import { createStore } from 'zustand';
import { GameState } from 'logic/game/gameState';
import { KasparovVeselin } from 'game-data/historicalGames';
import toggleSquare from 'logic/game/actionCreators/toggleSquare';
import promptToPromotePawn from 'logic/game/actionCreators/promptToPromotePawn';
import move from 'logic/game/actionCreators/move';
import rotateBoard from 'logic/game/actionCreators/rotateBoard';
import toggleBoard from 'logic/game/actionCreators/toggleBoard';
import { createContext, ReactNode, useContext, useRef } from 'react';

const createGameStore = () => createStore<GameState>((set) => {
  return {
    gamePlay: '',
    boardCursor: 0,
    selectedSquare: null,
    orientation: 0,
    onPromotePawn: null,
    actions: {
      toggleSquare: (square) => {
        return set(toggleSquare(square))
      },
      move: (from, to, promoteTo) => {
        return set(move(from, to, promoteTo))
      },
      toggleBoard: (boardCursor) => {
        return set(toggleBoard(boardCursor))
      },
      rotateBoard: () => {
        return set(rotateBoard())
      },
      promptToPromotePawn: (arg) => {
        return set(promptToPromotePawn(arg))
      }
    }
  }
});

type GameStore = ReturnType<typeof createGameStore>; 

export const GameContext = createContext<GameStore | null>(null);

export const GameContainer = ({ children }: { children: ReactNode }) => {
  const gameStoreRef = useRef<GameStore>();
  if(!gameStoreRef.current){
    gameStoreRef.current = createGameStore();
  }
  return (
    <GameContext.Provider value={gameStoreRef.current}>
      {children}
    </GameContext.Provider>
  )
}
