import movesIntoCheck from '@/logic/check/movesIntoCheck';
import { file, isOnBoard, playerAt, rank } from '@/logic/squares';
import { Square } from '@/logic/squares/square';
import { Position } from '@/logic/types/Position';

function knightCanMove(
	position: Position,
	fromSquare: Square,
	toSquare: Square,
) {
	if (!isOnBoard(toSquare)) {
		return false;
	}

	// can't move there if it's occupied by one of player's own pieces:
	if (playerAt(position, toSquare) === playerAt(position, fromSquare)) {
		return false;
	}

	const rectangularAreaOfDisplacement = Math.abs(
		(file(fromSquare) - file(toSquare))
			* (rank(fromSquare) - rank(toSquare)),
	);

	// Given the discrete nature of position moves,
	// this can only be true if moved 1 space in one direction
	// and 2 spaces in the orthogonal direction (i.e. how a knight moves):
	if (rectangularAreaOfDisplacement !== 2) {
		return false;
	}

	if (movesIntoCheck(position, fromSquare, toSquare)) {
		return false;
	}

	return true;
}

export default knightCanMove;
