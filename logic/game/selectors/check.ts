import { isCheckmate, isInCheck } from "logic/check";
import { GameAndCursor } from "logic/game/gameState";
import { currentBoard } from "logic/game/selectors/boards";
import currentPlayer from "logic/game/selectors/players";
import { Player } from "logic/types/Player";

export const currentlyInCheck = (game: GameAndCursor): Player | null => {
  const player = currentPlayer(game);
  const board = currentBoard(game);
  return isInCheck(board, player) ? player : null;
}

export const currentlyCheckmated = (game: GameAndCursor): Player | null => {
  const player = currentPlayer(game);
  const board = currentBoard(game);
  return isCheckmate(board, player) ? player : null;
}