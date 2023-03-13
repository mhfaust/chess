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
import { PositionName }  from 'logic/positions/positionName';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';

//Each of the piece-specific can-move functions has a less-demanding signtaure for 
//annotations than the combined canMoveTo, so we cury them to match it
const bishop = (b: Board, f: PositionName, t: PositionName) => bishopCanMove(b, f, t);
const knight = (b: Board, f: PositionName, t: PositionName) => knightCanMove(b, f, t);
const rook = (b: Board, f: PositionName, t: PositionName) => rookCanMove(b, f, t);
const pawn = (b: Board, f: PositionName, t: PositionName, _: unknown, a: PositionName) => pawnCanMove(b, f, t, a);
const king = (b: Board, f: PositionName, t: PositionName, a: CastlingPreclusions) => kingCanMove(b, f, t, a);
const queen = (b: Board, f: PositionName, t: PositionName) => queenCanMove(b, f, t);

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
    from: PositionName, 
    to: PositionName, 
    castlingPreclusions: CastlingPreclusions | null = null,
    enPassantSquare: PositionName | null = null,
): boolean {
    const strategy = strategies.get(pieceAt(board, from));
    return strategy(board, from, to, castlingPreclusions, enPassantSquare);

}

export default canMoveTo;