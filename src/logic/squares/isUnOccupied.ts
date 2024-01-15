import { ALL_PIECES } from '@/logic/constants/pieces';
import { pieceAt } from '@/logic/squares';
import { Square } from '@/logic/squares/square';
import { Position } from '@/logic/types/Position';

function isUnOccupied(position: Position, square: Square): boolean {
	return !pieceAt(position, square);
}

export default isUnOccupied;
