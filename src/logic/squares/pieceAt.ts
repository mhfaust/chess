import COORDS from '@/logic/squares/coordinates';
import { Square } from '@/logic/squares/square';
import { PieceOrEmpty, Position } from '@/logic/types/Position';

function pieceAt(position: Position, square?: Square): PieceOrEmpty {
	if (!square) {
		return null;
	}
	const [file, rank] = COORDS[square];
	return position[file][rank] ?? null;
}

export default pieceAt;
