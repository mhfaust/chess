import { Move } from 'logic/game/selectors/moves';
import { pawnSquareFromEpSquare } from 'logic/moves/enPassantSquare';
import isPawn from 'logic/pieces/isPawn';
import { file, otherPlayer, pieceAt, playerAt, rank } from 'logic/squares';
import COORDS from 'logic/squares/coordinates';
import { Piece } from 'logic/squares/piece';
import { shorthand } from 'logic/squares/pieces-shorthand';
import { Square } from 'logic/squares/square';
import { Position } from 'logic/types/Position';

const castlings: Record<string, [Square, Square] | undefined> = {
	'White King-e1c1': ['a1', 'd1'],
	'White King-e1g1': ['h1', 'f1'],
	'Black King-e8c8': ['a8', 'd8'],
	'Black King-e8g8': ['h8', 'f8'],
};

type MoveTuple = [Position, string];
const cache = new Map<Position, Map<string, MoveTuple>>();

const { entries, fromEntries } = Object;
export const promotions: Record<string, string> = {
	q: 'Queen',
	b: 'Bishop',
	n: 'Knight',
	r: 'Rook',
};
const promotionsInverted = fromEntries(entries(promotions).map(([a, b]) => [b, a]));
const promoCode = (p: Piece) => promotionsInverted[p.substring(6)];

export const moveHash = (move: Move): string => {
	if (move === 'RESIGN') {
		return 'RESING';
	}
	const [from, to, promotTo] = move;
	return `${from}${to}${promotTo ? promoCode(promotTo) : ''}`;
};

/** Does not validate the move (to may be occupied, may be in check, etc.) */
function nextPosition(
	previousPosition: Position,
	from: Square,
	to: Square,
	enPassantSquare: Square | null,
	promoteTo?: Piece,
): MoveTuple {
	const positionCache = cache.get(previousPosition)
		?? cache.set(previousPosition, new Map())
			.get(previousPosition) as Map<string, MoveTuple>;

	const other = otherPlayer(playerAt(previousPosition, from)!);
	const pieceThere = pieceAt(previousPosition, to);

	const isEpCapture = enPassantSquare === to && isPawn(pieceAt(previousPosition, from));
	const captured = isEpCapture
		? other === 'Black' ? 'BP' : 'WP'
		: pieceThere
		? shorthand(pieceThere)
		: '';

	const ep = isEpCapture ? 'ep' : '';
	const captStr = captured ? `-x${captured}${ep}` : '';

	const promoStr = promoteTo ? `(${shorthand(promoteTo)})` : '';

	const moveHash = `${from}${to}${captStr}${promoStr}`;

	const cachedPosition = positionCache.get(moveHash);
	if (cachedPosition) {
		return cachedPosition;
	}

	const newPosition: Position = [
		[...previousPosition[0]],
		[...previousPosition[1]],
		[...previousPosition[2]],
		[...previousPosition[3]],
		[...previousPosition[4]],
		[...previousPosition[5]],
		[...previousPosition[6]],
		[...previousPosition[7]],
	];

	const movedPiece = pieceAt(previousPosition, from);

	newPosition[file(from)][rank(from)] = null;
	newPosition[file(to)][rank(to)] = movedPiece;

	const castling = castlings[`${movedPiece}-${from}${to}`];
	if (castling) {
		const [castlingPosition] = nextPosition(newPosition, castling[0], castling[1], null);
		const castlingTuple: MoveTuple = [castlingPosition, moveHash];
		positionCache.set(moveHash, castlingTuple);
		return castlingTuple;
	}

	if (isEpCapture) {
		const capturedPawnSquare = pawnSquareFromEpSquare.get(to)!;
		const [file, rank] = COORDS[capturedPawnSquare];
		newPosition[file][rank] = null; // mutate
	}

	if (promoteTo) {
		const [file, rank] = COORDS[to];
		newPosition[file][rank] = promoteTo; // mutate
	}
	const moveTupple: MoveTuple = [newPosition, moveHash];
	positionCache.set(moveHash, moveTupple);
	return moveTupple;
}

export default nextPosition;
