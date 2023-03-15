import { ChessGame } from 'logic/game/gameState';
import { currentBoard } from './boards';
import { currentCaptures } from './captures';
import currentEnPassantSquare from './enPassant';
import { currentlyCheckmated, currentlyInCheck } from './check';
import { currentMove } from 'logic/game/selectors/moves';

export const currentGameView = (state: ChessGame) => {

  const { black: blackCaptures, white: whiteCaptures } = currentCaptures(state);

  return {
    board: currentBoard(state),
    latestMove: currentMove(state),
    enPassantSquare: currentEnPassantSquare(state),
    blackCaptures,
    whiteCaptures,
    inCheck: currentlyInCheck(state),
    checkmated: currentlyCheckmated(state)
  }
}