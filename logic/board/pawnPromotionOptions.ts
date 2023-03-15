import { pieceAt, rank } from 'logic/squares';
import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';
import { Board } from 'logic/types/Board';

export const blackPromotionOptions: Piece[] =  [
  'Black Queen', 
  'Black Knight',
  'Black Rook',
  'Black Bishop',

]
export const whitePromotionOptions: Piece[] =  [
  'White Queen', 
  'White Knight',
  'White Rook',
  'White Bishop',
]

const isPromotingPawn = (
  board: Board, 
  from: Square, 
  to: Square
): boolean => {
  const piece = pieceAt(board, from);
  const toRank = rank(to);
  return (piece === 'Black Pawn' && toRank === 0)
    || (piece === 'White Pawn' && toRank === 7);
}

export default isPromotingPawn;