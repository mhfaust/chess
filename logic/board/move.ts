import { file, rank, pieceAt, playerAt, otherPlayer }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/positions/positionName';
import enPassantSquare, { pawnPositionFromEpSquare } from 'logic/moves/enPassantSquare';
import COORDS from 'logic/positions/coordinates';
import { Piece } from 'logic/positions/piece';
import { shorthand } from 'logic/positions/pieces-shorthand';
import isPawn from 'logic/pieces/isPawn';
import textRender from './textRender';

const castlings: Record<string, [Square, Square] | undefined> = {
    'White King-e1c1': ['a1', 'd1'],
    'White King-e1g1': ['h1', 'f1'],
    'Black King-e8c8': ['a8', 'd8'],
    'Black King-e8g8': ['h8', 'f8'],
};

type MoveTuple = [Board, string]
const cache = new Map<Board, Map<string, MoveTuple>>();


/** Does not validate the move (to may be occupied, may be in check, etc.) */
function move ( 
    previousBoard: Board, 
    from: Square, 
    to: Square,
    enPassantSquare: Square | null,
    promoteTo?: Piece,
) : MoveTuple {

    const boardCache = cache.get(previousBoard) 
        ?? cache.set(previousBoard, new Map())
            .get(previousBoard) as Map<string, MoveTuple>;

    const other = otherPlayer(playerAt(previousBoard, from)!);
    const pieceThere = pieceAt(previousBoard, to);

    const isEpCapture = enPassantSquare === to && isPawn(pieceAt(previousBoard, from));
    const captured = isEpCapture
        ? other === 'Black' ? 'BP' : 'WP'
        : pieceThere ? shorthand(pieceThere) : ''

    const ep = isEpCapture ? 'ep' : '';
    const captStr = captured ? `-x${captured}${ep}` : '';

    const promoStr = promoteTo ? `(${shorthand(promoteTo)})` : ''
    
    const moveHash = `${from}${to}${captStr}${promoStr}`;

    const cachedBoard = boardCache.get(moveHash);
    if(cachedBoard){
        return cachedBoard;
    }

    const newBoard : Board = [
        [...previousBoard[0]],
        [...previousBoard[1]],
        [...previousBoard[2]],
        [...previousBoard[3]],
        [...previousBoard[4]],
        [...previousBoard[5]],
        [...previousBoard[6]],
        [...previousBoard[7]],
    ];

    const movedPiece =  pieceAt(previousBoard, from)

    newBoard[file(from)][rank(from)] = null;
    newBoard[file(to)][rank(to)] = movedPiece;

    const castling = castlings[`${movedPiece}-${from}${to}`];
    if(castling){
        const [castlingBoard] = move(newBoard, castling[0], castling[1], null);
        const castlingTuple: MoveTuple = [castlingBoard, moveHash];
        boardCache.set(moveHash, castlingTuple);
        return castlingTuple;
    }

    if(isEpCapture){
        const capturedPawnPosition = pawnPositionFromEpSquare.get(to)!;
        const [file, rank] = COORDS[capturedPawnPosition];
        newBoard[file][rank] = null; //mutate
    }

    if(promoteTo){
        const [file, rank] = COORDS[to];
        newBoard[file][rank] = promoteTo; //mutate
    }
    const moveTupple: MoveTuple = [newBoard, moveHash];
    boardCache.set(moveHash, moveTupple);
    return moveTupple;
}

export default move;