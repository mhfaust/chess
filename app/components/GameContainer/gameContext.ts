'use client'

import { createStore } from 'zustand';
import { GameState } from 'logic/game/gameState';
import toggleSquare from 'logic/game/actionCreators/toggleSquare';
import promptToPromotePawn from 'logic/game/actionCreators/promptToPromotePawn';
import move from 'logic/game/actionCreators/move';
import rotateBoard from 'logic/game/actionCreators/rotateBoard';
import togglePosition from 'logic/game/actionCreators/togglePosition';
import { createContext } from 'react';
import init from 'logic/game/actionCreators/init';

export const createGameStore = (onMove: (move: string) => void) => createStore<GameState>((set) => {
  return {
    gamePlay: '',
    positionCursor: 0,
    selectedSquare: null,
    orientation: 0,
    onPromotePawn: null,
    actions: {
      init: (initialGamePlay, initialPosition) => {
        return set(init(initialGamePlay, initialPosition))
      },
      toggleSquare: (square) => {
        return set(toggleSquare(square))
      },
      move: (from, to, promoteTo) => {
        return set(move(from, to, promoteTo, onMove))
      },
      togglePosition: (positionCursor) => {
        return set(togglePosition(positionCursor))
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


