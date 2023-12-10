import { GameState } from 'logic/game/gameState';
import { currentCastling } from 'logic/game/selectors/castling';
import currentEnPassantSquare from 'logic/game/selectors/enPassant';
import { currentPosition } from 'logic/game/selectors/positions';
import allPieceMoves from 'logic/moves/allPieceMoves';
import { Square } from 'logic/squares/square';

const noMoves = new Set<Square>();

export const currentValidMoves = (game: Pick<GameState, 'gamePlay' | 'positionCursor' | 'selectedSquare'>) => {
	const thisPosition = currentPosition(game);
	const { selectedSquare } = game;
	const precludedCastling = currentCastling(game);
	const epSquare = currentEnPassantSquare(game);
	if (!selectedSquare) {
		return noMoves;
	}
	const moves = allPieceMoves(
		thisPosition,
		selectedSquare,
		precludedCastling,
		epSquare,
	) || noMoves;

	return moves ? new Set(moves) : noMoves;
};
