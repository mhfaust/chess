import { create } from 'zustand';
import { GameView } from 'logic/game/gameState';
import { currentBoard } from './selectors/boards';
import { playerAt } from 'logic/squares';
import { moveHash } from 'logic/board/move';

export const useGameStore = create<GameView>((set) => {
  return {
    gamePlay: "",
    boardCursor: 0,
    selectedSquare: null,
    toggleSelectedSquare: (positionName) => {
      return set(({ selectedSquare, gamePlay, boardCursor }) => {
        const gameBoard  = currentBoard({ gamePlay, boardCursor });

        const isAnotherPieceOfSamePlayer = selectedSquare
          && positionName 
          && selectedSquare !== positionName
          && playerAt(gameBoard, positionName) === playerAt(gameBoard, selectedSquare);
        
        const togglesOn = positionName && positionName !== selectedSquare;

        const nextSelectedSquare = isAnotherPieceOfSamePlayer || togglesOn 
          ? positionName 
          : null; 

        return { selectedSquare:  nextSelectedSquare }
      })
    },
    makeNextMove: (from, to, promoteTo) => {
      return set(({ gamePlay, boardCursor }) => {
        const newHash = moveHash([from, to, promoteTo]);
        return {
          gamePlay: gamePlay ? gamePlay + ',' + newHash : newHash,
          boardCursor: boardCursor + 1
        };
      })
    }
  }
});