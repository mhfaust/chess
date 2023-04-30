import allPieceMoves from "logic/moves/allPieceMoves";
import { GameState } from "logic/game/gameState";
import { currentPosition } from "logic/game/selectors/positions";
import { currentCastling } from "logic/game/selectors/castling";
import currentEnPassantSquare from "logic/game/selectors/enPassant";
import { Square } from "logic/squares/square";

const noMoves = new Set<Square>();

export const currentValidMoves = (game: Pick<GameState, 'gamePlay' | 'boardCursor' | 'selectedSquare'>) => {
  const thisPosition = currentPosition(game);
  const { selectedSquare } = game;
  const precludedCastling = currentCastling(game);
  const epSquare = currentEnPassantSquare(game);
  if(!selectedSquare) {
    return noMoves;
  }
  const moves = allPieceMoves(
    thisPosition, 
    selectedSquare, 
    precludedCastling, 
    epSquare 
  ) || noMoves;

  return moves ? new Set(moves) : noMoves;
}