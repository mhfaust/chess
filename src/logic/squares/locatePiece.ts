import { pieceAt } from '@/logic/squares';
import square, { Square } from '@/logic/squares/square';
import { Position } from '@/logic/types/Position';

export type UniquePiece =
	| 'White King'
	| 'White Queen'
	| 'Black King'
	| 'Black Queen';

/**
 * @param position
 * @param piece
 * @returns
 */
function locatePiece(position: Position, piece: UniquePiece): Square | null {
	for (let file = 0; file < 8; file++) {
		for (let rank = 0; rank < 8; rank++) {
			const coords: ReadonlyArray<number> = [file, rank];
			if (position[file][rank] === piece) {
				return square(coords);
			}
		}
	}
	return null;
}

export default locatePiece;
