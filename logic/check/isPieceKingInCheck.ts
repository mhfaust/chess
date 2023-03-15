import { pieceAt, playerAt } from 'logic/squares';
import { Square } from 'logic/squares/square';
import { Board, PieceOrEmpty } from 'logic/types/Board';
import isInCheck from './isInCheck';

const kings: [PieceOrEmpty, PieceOrEmpty] = ['Black King', 'White King'];

const isPieceKingInCheck = (board: Board, square: Square) => {
  const player = playerAt(board, square);
  const piece = pieceAt(board, square);
  if (!piece || !player || !kings.includes(piece) !){
    return false;
  }
  return isInCheck(board, player);
}

export default isPieceKingInCheck;