import { displaceTo, isUnOccupiedByPlayer, playerAt } from 'logic/squares';

import movesIntoCheck from 'logic/check/movesIntoCheck';
import { knightVectors } from 'logic/constants/move-vectors';
import { Square } from 'logic/squares/square';
import { Position } from 'logic/types/Position';

const emptySet = new Set<Square>();

function knight(
	position: Position,
	moveFrom: Square,
): Set<Square> {
	const player = playerAt(position, moveFrom);
	if (!player) {
		return emptySet;
	}
	return new Set(
		knightVectors
			.map(vector => displaceTo(moveFrom, vector))
			.filter(i => i !== null)
			.filter(targetSquare => isUnOccupiedByPlayer(position, targetSquare!, player))
			.filter(square => !movesIntoCheck(position, moveFrom, square!)),
	) as Set<Square>;
}

export default knight;
