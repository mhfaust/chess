import { pieceAt, playerAt } from 'logic/positions';
import { PositionName } from 'logic/positions/positionName';
import { Board, PieceOrEmpty } from 'logic/types/Board';
import isInCheck from './isInCheck';

const kings: [PieceOrEmpty, PieceOrEmpty] = ['Black King', 'White King'];

const isPieceKingInCheck = (board: Board, position: PositionName) => {
  const player = playerAt(board, position);
  const piece = pieceAt(board, position);
  if (!piece || !player || !kings.includes(piece) !){
    return false;
  }
  return isInCheck(board, player);
}

export default isPieceKingInCheck;