import { BLACK_PIECES } from 'logic/constants/pieces';
import { pieceAt } from 'logic/squares';
import { Square } from 'logic/squares/square';
import { Player } from 'logic/types/Player';
import { Position } from 'logic/types/Position';

const playerAt = (position: Position, square: Square): Player | null => {
	const piece = pieceAt(position, square);

	if (piece === null) {
		return null;
	}

	return BLACK_PIECES.has(piece) ? 'Black' : 'White';
};

export default playerAt;
