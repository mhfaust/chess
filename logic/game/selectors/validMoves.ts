import allPieceMoves from "logic/moves/allPieceMoves";
import { GameState } from "logic/game/gameState";
import { currentBoard } from "logic/game/selectors/boards";
import { currentCastling } from "logic/game/selectors/castling";
import currentEnPassantSquare from "logic/game/selectors/enPassant";
import { Square } from "logic/squares/square";

const noMoves = new Set<Square>();

export const currentValidMoves = (game: Pick<GameState, 'gamePlay' | 'boardCursor' | 'selectedSquare'>) => {
  const thisBoard = currentBoard(game);
  const { selectedSquare } = game;
  const precludedCastling = currentCastling(game);
  const epSquare = currentEnPassantSquare(game);
  if(!selectedSquare) {
    return noMoves;
  }
  const moves = allPieceMoves(
    thisBoard, 
    selectedSquare, 
    precludedCastling, 
    epSquare 
  ) || noMoves;

  return moves ? new Set(moves) : noMoves;
}