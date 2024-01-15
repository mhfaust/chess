import { file, rank } from '@/logic/squares';
import { Square } from '@/logic/squares/square';

const isOnBoard = (square: Square) => {
	if (!square) {
		return false;
	}
	return file(square) > -1
		&& file(square) < 8
		&& rank(square) > -1
		&& rank(square) < 8;
};

export default isOnBoard;
