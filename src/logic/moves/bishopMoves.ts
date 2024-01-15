import { displaceTo, isOccupiedByPlayer, isUnOccupied, otherPlayer, playerAt } from '@/logic/squares';

import { movesIntoCheck } from '@/logic/check';
import { bishopVectors } from '@/logic/constants/move-vectors';
import { Square } from '@/logic/squares/square';
import { MoveVector } from '@/logic/types/MoveVector';
import { Position } from '@/logic/types/Position';

const emptySet = new Set<Square>();

function bishop(
	position: Position,
	moveFrom: Square,
): Set<Square> {
	const player = playerAt(position, moveFrom);
	if (!player) {
		return emptySet;
	}
	const legalMoves: Array<Square> = [];

	bishopVectors.forEach((vector: MoveVector): void => {
		let examinedSquare = displaceTo(moveFrom, vector);

		while (examinedSquare && isUnOccupied(position, examinedSquare)) {
			legalMoves.push(examinedSquare);
			examinedSquare = displaceTo(examinedSquare, vector);
		}
		if (examinedSquare && isOccupiedByPlayer(position, examinedSquare, otherPlayer(player))) {
			legalMoves.push(examinedSquare);
		}
	});

	return new Set(legalMoves
		.filter(moveTo => !movesIntoCheck(position, moveFrom, moveTo)));
}

export default bishop;
