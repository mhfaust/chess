import { create } from 'zustand';
import { GameView } from 'logic/game/gameState';
import { moveHash } from 'logic/board/move';

export const useGameStore = create<GameView>((set) => {
  return {
    gamePlay: "",
    boardCursor: 0,
    selectedSquare: null,
    toggleSquare: (square) => {
      return set(({ selectedSquare }) => {
        const nextSelectedSquare = square !== selectedSquare && square || null;
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