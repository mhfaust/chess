import { bishopMoves, rookMoves } from '@/logic/moves';
import { Square } from '@/logic/squares/square';
import { Position } from '@/logic/types/Position';

function queen(
	position: Position,
	moveFrom: Square,
): Set<Square> {
	return new Set([
		...Array.from(rookMoves(position, moveFrom)),
		...Array.from(bishopMoves(position, moveFrom)),
	]);
}

export default queen;
