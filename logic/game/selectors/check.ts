import { isCheckmate, isInCheck } from "logic/check";
import { ChessGame } from "logic/game/gameState";
import { currentBoard } from "logic/game/selectors/boards";
import currentPlayer from "logic/game/selectors/players";
import { Player } from "logic/types/Player";

export const currentlyInCheck = (game: ChessGame): Player | null => {
  const player = currentPlayer(game);
  const board = currentBoard(game);
  return isInCheck(board, player) ? player : null;
}

export const currentlyCheckmated = (game: ChessGame): Player | null => {
  const player = currentPlayer(game);
  const board = currentBoard(game);
  return isCheckmate(board, player) ? player : null;
}