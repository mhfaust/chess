import { pieceAt } from 'logic/positions';
import { PositionName } from 'logic/positions/positionName';
import { Board } from 'logic/types/Board';

const areEmpty = (board: Board, ...squares: PositionName[]) => {
  return squares.every(square => pieceAt(board, square) === null);
}

export default areEmpty;