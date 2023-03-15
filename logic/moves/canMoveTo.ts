import { 
    bishopCanMove, 
    kingCanMove, 
    knightCanMove, 
    pawnCanMove, 
    queenCanMove, 
    rookCanMove 
} from 'logic/moves';
import { pieceAt }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/positions/positionName';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';

//Each of the piece-specific can-move functions has a less-demanding signtaure for 
//annotations than the combined canMoveTo, so we cury them to match it
const bishop = (b: Board, f: Square, t: Square) => bishopCanMove(b, f, t);
const knight = (b: Board, f: Square, t: Square) => knightCanMove(b, f, t);
const rook = (b: Board, f: Square, t: Square) => rookCanMove(b, f, t);
const pawn = (b: Board, f: Square, t: Square, _: unknown, a: Square) => pawnCanMove(b, f, t, a);
const king = (b: Board, f: Square, t: Square, a: CastlingPreclusions) => kingCanMove(b, f, t, a);
const queen = (b: Board, f: Square, t: Square) => queenCanMove(b, f, t);

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
    (...params: Parameters<typeof canMoveTo>) => boolean;


function canMoveTo (
    board: Board,
    from: Square, 
    to: Square, 
    castlingPreclusions: CastlingPreclusions | null = null,
    enPassantSquare: Square | null = null,
): boolean {
    const strategy = strategies.get(pieceAt(board, from));
    return strategy(board, from, to, castlingPreclusions, enPassantSquare);

}

export default canMoveTo;