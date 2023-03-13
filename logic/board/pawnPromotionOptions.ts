import { pieceAt, rank } from 'logic/positions';
import { Piece } from 'logic/positions/piece';
import { PositionName } from 'logic/positions/positionName';
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
  from: PositionName, 
  to: PositionName
): boolean => {
  const piece = pieceAt(board, from);
  const toRank = rank(to);
  return (piece === 'Black Pawn' && toRank === 0)
    || (piece === 'White Pawn' && toRank === 7);
}

export default isPromotingPawn;