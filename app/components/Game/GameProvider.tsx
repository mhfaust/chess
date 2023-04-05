'use client';

import moveActionCreator, { MoveParams } from 'logic/game/actionCreators/move';
import toggleSquare from 'logic/game/actionCreators/toggleSquare';
import { GameState, PawnPromoteTuple, PawnPromotionCallback } from 'logic/game/gameState';
import { Square } from 'logic/squares/square';
import React, { createContext, ReactNode, useContext, useReducer, useState } from 'react';
import { Piece } from 'logic/squares/piece';

/**
 * Pawn promotion isn't working witht his state management
 */

const initialState = {
  gamePlay: '',
  boardCursor: 0,
  selectedSquare: null,
  orientation: 0,
  onPromotePawn: null,
  actions: {
    toggleSquare: () => {},
    move: () => {},
    toggleBoard: () => {},
    rotateBoard: () => {},
    promptToPromotePawn: () => {},
  }
};

// Create the context with default values
const GameContext: React.Context<GameState> = createContext<GameState>(
  initialState
);

type GameProviderProps = {
  children: ReactNode;
  initialGamePlay: string;
};

// Create the provider component
export const GameProvider = ({ children, initialGamePlay }: GameProviderProps) => {
  const [gamePlay, setGamePlay] = useState<string>(initialGamePlay);
  const [boardCursor, setBoardCursor] = useState<number>(0);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [orientation, setOrientation] = useState<number>(0);
  const [onPromotePawn, setOnPromotePawn] = useState<PawnPromotionCallback | null>(null);

  const move = (...params: MoveParams) => {
    const { 
      gamePlay: newGamePlay, 
      boardCursor: newBoardCursor 
    } = moveActionCreator(...params)({ gamePlay, boardCursor });
    setGamePlay(newGamePlay);
    setBoardCursor(newBoardCursor);
  };

  const promptToPromotePawn = (arg: PawnPromoteTuple | null) => {
    if (!arg){
      setOnPromotePawn(null);
    }
    else {
      setOnPromotePawn((promotePawnTo :Piece) => {
        const [from, to] = arg;
        move(from, to, promotePawnTo);
        setOnPromotePawn(null);
      } )
    }
  }

  const gameState: GameState = {
    gamePlay,
    boardCursor,
    selectedSquare,
    orientation,
    onPromotePawn,
    actions: {
      toggleSquare: (square) => {
        const {
          selectedSquare: newSelectedSquare,
          onPromotePawn: newOnPromotePawn,
        } = toggleSquare(square)({
          gamePlay,
          boardCursor,
          selectedSquare,
          onPromotePawn,
          actions: {
            move,
            promptToPromotePawn
          },
        });
console.log('newOnPromotePawn: ' + newOnPromotePawn)
        if(newSelectedSquare !== undefined){
          setSelectedSquare(newSelectedSquare)
        };
        if(newOnPromotePawn !== undefined){
          setOnPromotePawn(newOnPromotePawn)
        }
      },
      move,
      toggleBoard: (boardCursor) => {
        setBoardCursor(boardCursor);
      },
      rotateBoard: () => {
        setOrientation(orientation + 1)
      },
      promptToPromotePawn,
    }
  }

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
};

export function useGameStore<T>(selector: (g: GameState) => T): T {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return selector(context);
}
