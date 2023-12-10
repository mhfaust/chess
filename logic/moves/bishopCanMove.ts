import movesIntoCheck from 'logic/check/movesIntoCheck';
import { displaceTo, file, isOccupied, isOnBoard, playerAt, rank } from 'logic/squares';
import { Square } from 'logic/squares/square';
import { Position } from 'logic/types/Position';

function bishopCanMove(
	position: Position,
	fromSquare: Square,
	toSquare: Square,
): boolean {
	if (!isOnBoard(toSquare)) {
		return false;
	}
	const thisPlayer = playerAt(position, toSquare);

	// can't move there if it's occupied by one of player's own pieces:
	if (thisPlayer === playerAt(position, fromSquare)) {
		return false;
	}

	const fileMove = file(toSquare) - file(fromSquare);
	const rankMove = rank(toSquare) - rank(fromSquare);

	// if neither file and rank were changed then
	// it's not a valid bishop move:
	if (fileMove === 0 || rankMove === 0) {
		return false;
	}

	// diagonal move means rank and file changed by the same amount:
	if (Math.abs(fileMove) !== Math.abs(rankMove)) {
		return false;
	}

	const moveVector = [Math.sign(fileMove), Math.sign(rankMove)];
	// start checking one step out from the move-from square
	let step = displaceTo(fromSquare, moveVector);

	// and keep checking until we run into a piece or the move-to square:
	while (step && step !== toSquare) {
		if (isOccupied(position, step)) {
			return false;
		}
		step = displaceTo(step, moveVector);
	}

	if (movesIntoCheck(position, fromSquare, toSquare)) {
		return false;
	}

	return true;
}

export default bishopCanMove;
