import { create } from 'zustand';
import { GameView } from 'logic/game/gameState';
import { moveHash } from 'logic/board/move';
import { KasparovVeselin } from 'game-data/historicalGames';

export const useGameStore = create<GameView>((set) => {
  return {
    gamePlay: KasparovVeselin,
    boardCursor: 0,
    selectedSquare: null,
    orientation: 0,
    actions: {
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
      },
      toggleBoard: (boardIndex: number) => {
        return set(() => ({ boardCursor: boardIndex }))
      },
      rotateBoard: () => {
        return set(({ orientation }) => ({ 
          orientation: ((orientation +  1))  
        }))
      }
    }
  }
});