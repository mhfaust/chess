import { GameState } from "../gameState";
import { currentBoard } from "./boards";
import { currentCaptures } from "./captures";
import currentEnPassantSquare from "./enPassant";
import { currentMove } from "./moves";

export const currentGameView = (state: GameState) => {

  const { black: blackCaptures, white: whiteCaptures } = currentCaptures(state);

  return {
    board: currentBoard(state),
    lastMove: currentMove(state),
    enPassantSquare: currentEnPassantSquare(state),
    blackCaptures,
    whiteCaptures,
  }
}