import { 
  bishopMoves, 
  kingMoves, 
  knightMoves, 
  pawnMoves, 
  queenMoves, 
  rookMoves 
} from 'logic/moves';
import { pieceAt }  from 'logic/squares';
import { Position }  from 'logic/types/Board';
import { Square }  from 'logic/squares/square';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';
import { Piece } from 'logic/squares/piece';

//Each of the piece-specific can-move functions has a less-demanding signtaure for 
//annotations than the combined canMoveTo, so we cury them to match it
const bishop = (b: Position, f: Square) => bishopMoves(b, f);
const knight = (b: Position, f: Square) => knightMoves(b, f);
const rook = (b: Position, f: Square) => rookMoves(b, f);
const pawn = (b: Position, f: Square, _: CastlingPreclusions, a: Square) => pawnMoves(b, f, a);
const king = (b: Position, f: Square, a: CastlingPreclusions) => kingMoves(b, f, a);
const queen = (b: Position, f: Square) => queenMoves(b, f);

const emptySet = new Set<Square>();

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
  (...params: Parameters<typeof allPieceMoves>) => Set<Square>;


function allPieceMoves (
  position: Position,
  from: Square, 
  castlingPreclusions: CastlingPreclusions | null = null,
  enPassantSquare: Square | null = null,
): Set<Square> {
  const piece = pieceAt(position, from);
  if(!piece){
    return emptySet; 
  }
  const strategy: CanMoveTo = strategies.get(piece);
  return strategy(position, from, castlingPreclusions, enPassantSquare);

}

export default allPieceMoves;