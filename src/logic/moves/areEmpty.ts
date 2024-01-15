import { pieceAt } from '@/logic/squares';
import { Square } from '@/logic/squares/square';
import { Position } from '@/logic/types/Position';

const areEmpty = (position: Position, ...squares: Square[]) => {
	return squares.every(square => pieceAt(position, square) === null);
};

export default areEmpty;
