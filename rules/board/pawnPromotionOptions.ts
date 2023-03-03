import { pieceAt, rank } from "rules/positions";
import { Piece } from "rules/positions/piece";
import { PositionName } from "rules/positions/positionName";
import { Board } from "rules/types/Board";

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

const pawnPromotionOptions = (
  board: Board, 
  from: PositionName, 
  to: PositionName
): Piece[] | null => {
  const piece = pieceAt(board, from);
  const toRank = rank(to);
  if (piece === 'Black Pawn' && toRank === 0) {
    return blackPromotionOptions
  }
  if (piece === 'White Pawn' && toRank === 7) {
    return whitePromotionOptions 
  }
  return null;
}

export default pawnPromotionOptions;