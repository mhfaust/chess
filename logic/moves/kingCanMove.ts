import { isInCheck } from 'logic/check';
import movesIntoCheck from 'logic/check/movesIntoCheck';
import areEmpty from 'logic/moves/areEmpty';
import { file, pieceAt, playerAt, rank } from 'logic/squares';
import { Square } from 'logic/squares/square';
import { CastlingPreclusions } from 'logic/types/CastlingPreclusions';
import { Position } from 'logic/types/Position';

function kingCanMove(
	position: Position,
	from: Square,
	to: Square,
	castlingPreclusions: CastlingPreclusions,
) {
	const player = playerAt(position, from);

	// normal move
	if (
		Math.abs(rank(to) - rank(from)) < 2
		&& Math.abs(file(to) - file(from)) < 2
		&& player !== playerAt(position, to)
		&& !movesIntoCheck(position, from, to)
	) {
		return true;
	}

	// Can't castle out of check, so if they're in check & don't look for castling moves:
	if (player && isInCheck(position, player)) {
		return false;
	}

	if (from === 'e1' && player === 'White') {
		if (to === 'g1') {
			return !castlingPreclusions.has('h1')
				&& areEmpty(position, 'f1', 'g1')
				&& !movesIntoCheck(position, 'e1', 'f1') // across check
				&& !movesIntoCheck(position, 'e1', 'g1'); // into check
		}
		if (to === 'c1') {
			return !castlingPreclusions.has('a1')
				&& areEmpty(position, 'b1', 'c1', 'd1')
				&& !movesIntoCheck(position, 'e1', 'd1') // across check
				&& !movesIntoCheck(position, 'e1', 'c1'); // into check
		}
		return false;
	}
	if (from === 'e8' && player === 'Black') {
		if (to === 'g8') {
			return !castlingPreclusions.has('h8')
				&& areEmpty(position, 'f8', 'g8')
				&& !movesIntoCheck(position, 'e8', 'f8') // across check
				&& !movesIntoCheck(position, 'e8', 'g8'); // into check
		}
		if (to === 'c8') {
			return !castlingPreclusions.has('a8')
				&& areEmpty(position, 'b8', 'c8', 'd8')
				&& !movesIntoCheck(position, 'e8', 'd8') // across check
				&& !movesIntoCheck(position, 'e8', 'c8'); // into check
		}
		return false;
	}

	return false;
}

export default kingCanMove;
