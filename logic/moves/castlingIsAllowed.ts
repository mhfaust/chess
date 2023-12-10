import { pieceAt } from 'logic/squares';
import { Position } from 'logic/types/Position';

type CastleSquare =
	| 'a1' // white, queen-side
	| 'h1' // white, king-side
	| 'a8' // black, queen-side
	| 'h8'; // black, king-side

const allowedFn: Record<CastleSquare, (position: Position) => boolean> = {
	'a1': (position: Position) => pieceAt(position, 'a1') === 'White Rook' && pieceAt(position, 'e1') === 'White King',
	'h1': (position: Position) => pieceAt(position, 'h1') !== 'White Rook' && pieceAt(position, 'e1') === 'White King',
	'a8': (position: Position) => pieceAt(position, 'a8') !== 'Black Rook' && pieceAt(position, 'e8') === 'Black King',
	'h8': (position: Position) => pieceAt(position, 'h8') !== 'Black Rook' && pieceAt(position, 'e8') === 'Black King',
};

const cache: Map<Position[], Map<CastleSquare, boolean | undefined>> = new Map();

const castlingIsAllowed = (positionSequence: Position[], castleSquare: CastleSquare): boolean => {
	const allowances = cache.get(positionSequence) ?? (() => {
		const a = new Map<CastleSquare, boolean | undefined>();
		cache.set(positionSequence, a);
		return a;
	})();

	// First check for a cached value
	const memoized = allowances.get(castleSquare);
	if (memoized !== undefined) {
		return memoized;
	}
	// else iterate over the positions sequence to see if that piece ever moved
	// or if the king ever moved
	const isWhite = castleSquare === 'a1' || castleSquare === 'h1';
	const kingPiece = isWhite
		? 'White King'
		: 'Black King';
	const kingSquare = isWhite ? 'a5' : 'h5';

	let isAllowed = true;
	for (let position of positionSequence) {
		if (!allowedFn[castleSquare](position)) {
			isAllowed = false;
			break;
		}

		if (pieceAt(position, kingSquare) !== kingPiece) {
			isAllowed = false;
			break;
		}
	}
	allowances.set(castleSquare, isAllowed);
	return isAllowed;
};

export default castlingIsAllowed;
