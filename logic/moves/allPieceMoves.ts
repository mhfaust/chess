import { 
  bishopMoves, 
  kingMoves, 
  knightMoves, 
  pawnMoves, 
  queenMoves, 
  rookMoves 
} from 'rules/moves';
import { pieceAt }  from 'rules/positions';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';
import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';
import { Piece } from 'rules/positions/piece';

//Each of the piece-specific can-move functions has a less-demanding signtaure for 
//annotations than the combined canMoveTo, so we cury them to match it
const bishop = (b: Board, f: PositionName) => bishopMoves(b, f);
const knight = (b: Board, f: PositionName) => knightMoves(b, f);
const rook = (b: Board, f: PositionName) => rookMoves(b, f);
const pawn = (b: Board, f: PositionName, _: CastlingPreclusions, a: PositionName) => pawnMoves(b, f, a);
const king = (b: Board, f: PositionName, a: CastlingPreclusions) => kingMoves(b, f, a);
const queen = (b: Board, f: PositionName) => queenMoves(b, f);

const emptySet = new Set<PositionName>();

const strategies = new Map()
  .set('Black Bishop', bishop)
  .set('White Bishop', bishop)
  .set('Black Knight', knight)
  .set('White Knight', knight)
  .set('Black Rook', rook)
  .set('White Rook', rook)
  .set('Black Queen', queen)
  .set('White Queen', queen)
  .set('Black King', king)
  .set('White King', king)
  .set('Black Pawn', pawn)
  .set('White Pawn', pawn)

export type CanMoveTo = 
  (...params: Parameters<typeof allPieceMoves>) => Set<PositionName>;


function allPieceMoves (
  board: Board,
  from: PositionName, 
  castlingPreclusions: CastlingPreclusions | null = null,
  enPassantSquare: PositionName | null = null,
): Set<PositionName> {
  const piece = pieceAt(board, from);
  if(!piece){
    return emptySet; 
  }
  const strategy: CanMoveTo = strategies.get(piece);
  return strategy(board, from, castlingPreclusions, enPassantSquare);

}

export default allPieceMoves;