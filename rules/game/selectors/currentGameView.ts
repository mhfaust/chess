import { GameState } from 'rules/game/gameState';
import { currentBoard } from './boards';
import { currentCaptures } from './captures';
import currentEnPassantSquare from './enPassant';
import { currentMove } from './moves';

export const currentGameView = (state: Pick<GameState, 'gamePlay' | 'boardCursor'>) => {

  const { black: blackCaptures, white: whiteCaptures } = currentCaptures(state);

  return {
    board: currentBoard(state),
    latestMove: currentMove(state),
    enPassantSquare: currentEnPassantSquare(state),
    blackCaptures,
    whiteCaptures,
  }
}