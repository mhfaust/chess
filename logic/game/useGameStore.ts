import { create } from 'zustand';
import { GameView } from 'logic/game/gameState';
import { KasparovVeselin } from 'game-data/historicalGames';
import toggleSquare from 'logic/game/actionCreators/toggleSquare';
import promotePawn from 'logic/game/actionCreators/promotePawn';
import nextMove from 'logic/game/actionCreators/nextMove';
import rotateBoard from './actionCreators/rotateBoard';
import toggleBoard from './actionCreators/toggleBoard';

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
      move: (from, to, promoteTo) => {
        return set(nextMove(from, to, promoteTo))
      },
      toggleBoard: (boardCursor) => {
        return set(toggleBoard(boardCursor))
      },
      rotateBoard: () => {
        return set(rotateBoard)
      },
      promptToPromotePawn: (arg => {
        return set(promotePawn(arg))
      })
    }
  }
});