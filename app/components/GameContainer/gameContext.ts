'use client'

import { createStore } from 'zustand';
import { GameState } from 'logic/game/gameState';
import toggleSquare from 'logic/game/actionCreators/toggleSquare';
import promptToPromotePawn from 'logic/game/actionCreators/promptToPromotePawn';
import move from 'logic/game/actionCreators/move';
import rotateBoard from 'logic/game/actionCreators/rotateBoard';
import toggleBoard from 'logic/game/actionCreators/toggleBoard';
import { createContext } from 'react';

export const createGameStore = () => createStore<GameState>((set) => {
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

export type GameStore = ReturnType<typeof createGameStore>; 

export const gameContext = createContext<GameStore | null>(null);


