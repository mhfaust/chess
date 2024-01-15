import { pieceAt } from '@/logic/squares';
import { Square } from '@/logic/squares/square';
import { Position } from '@/logic/types/Position';

function isOccupied(
	position: Position,
	square: Square,
): boolean {
	return Boolean(pieceAt(position, square));
}

export default isOccupied;
