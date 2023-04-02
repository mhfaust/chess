import { create } from 'zustand';
import { GameView } from 'logic/game/gameState';
import { moveHash } from 'logic/board/move';
import { KasparovVeselin } from 'game-data/historicalGames';
import toggleSquare from './actions/toggleSquare';

export const useGameStore = create<GameView>((set) => {
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
      makeNextMove: (from, to, promoteTo) => {
        return set(({ gamePlay, boardCursor }) => {
          const newHash = moveHash([from, to, promoteTo]);
          return {
            gamePlay: gamePlay ? gamePlay + ',' + newHash : newHash,
            boardCursor: boardCursor + 1
          };
        })
      },
      toggleBoard: (boardCursor) => {
        return set(() => ({ boardCursor }))
      },
      rotateBoard: () => {
        return set(({ orientation }) => ({ 
          orientation: ((orientation +  1))  
        }))
      },
      setOnPromotePawn: (arg => {
        return set(({ actions: { makeNextMove, setOnPromotePawn }}) => ({
          onPromotePawn: arg
            ? (promotePawnTo) => {
              const [from, to] = arg;
              makeNextMove(from, to, promotePawnTo);
              setOnPromotePawn(null);
            } : null,

        }))
      })
    }
  }
});