import { pieceAt } from 'logic/positions';
import { Square } from 'logic/positions/positionName';
import { Board } from 'logic/types/Board';

const areEmpty = (board: Board, ...squares: Square[]) => {
  return squares.every(square => pieceAt(board, square) === null);
}

export default areEmpty;