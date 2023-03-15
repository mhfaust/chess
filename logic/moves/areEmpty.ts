import { pieceAt } from 'logic/squares';
import { Square } from 'logic/squares/square';
import { Board } from 'logic/types/Board';

const areEmpty = (board: Board, ...squares: Square[]) => {
  return squares.every(square => pieceAt(board, square) === null);
}

export default areEmpty;