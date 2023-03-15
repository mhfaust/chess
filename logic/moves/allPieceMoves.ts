import { 
  bishopMoves, 
  kingMoves, 
  knightMoves, 
  pawnMoves, 
  queenMoves, 
  rookMoves 
} from 'logic/moves';
import { pieceAt }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/positions/square';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';
import { Piece } from 'logic/positions/piece';

//Each of the piece-specific can-move functions has a less-demanding signtaure for 
//annotations than the combined canMoveTo, so we cury them to match it
const bishop = (b: Board, f: Square) => bishopMoves(b, f);
const knight = (b: Board, f: Square) => knightMoves(b, f);
const rook = (b: Board, f: Square) => rookMoves(b, f);
const pawn = (b: Board, f: Square, _: CastlingPreclusions, a: Square) => pawnMoves(b, f, a);
const king = (b: Board, f: Square, a: CastlingPreclusions) => kingMoves(b, f, a);
const queen = (b: Board, f: Square) => queenMoves(b, f);

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
  board: Board,
  from: Square, 
  castlingPreclusions: CastlingPreclusions | null = null,
  enPassantSquare: Square | null = null,
): Set<Square> {
  const piece = pieceAt(board, from);
  if(!piece){
    return emptySet; 
  }
  const strategy: CanMoveTo = strategies.get(piece);
  return strategy(board, from, castlingPreclusions, enPassantSquare);

}

export default allPieceMoves;