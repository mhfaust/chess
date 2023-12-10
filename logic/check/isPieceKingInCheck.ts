import { pieceAt, playerAt } from 'logic/squares';
import { Square } from 'logic/squares/square';
import { PieceOrEmpty, Position } from 'logic/types/Position';
import isInCheck from './isInCheck';

const kings: [PieceOrEmpty, PieceOrEmpty] = ['Black King', 'White King'];

const isPieceKingInCheck = (position: Position, square: Square) => {
	const player = playerAt(position, square);
	const piece = pieceAt(position, square);
	if (!piece || !player || !kings.includes(piece)!) {
		return false;
	}
	return isInCheck(position, player);
};

export default isPieceKingInCheck;
