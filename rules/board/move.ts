import { file, rank, pieceAt, playerAt, otherPlayer }  from 'rules/positions';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';
import enPassantSquare, { pawnPositionFromEpSquare } from 'rules/moves/enPassantSquare';
import COORDS from 'rules/positions/coordinates';
import { Piece } from 'rules/positions/piece';
import { shorthand } from 'rules/positions/pieces-shorthand';
import isPawn from 'rules/pieces/isPawn';

const castlings: Record<string, [PositionName, PositionName] | undefined> = {
    'White King-E1-C1': ['A1', 'D1'],
    'White King-E1-G1': ['H1', 'F1'],
    'Black King-E8-C8': ['A8', 'D8'],
    'Black King-E8-G8': ['H8', 'F8'],
};

type MoveTuple = [Board, string]
const cache = new Map<Board, Map<string, MoveTuple>>();


/** Does not validate the move (to may be occupied, may be in check, etc.) */
function move ( 
    previousBoard: Board, 
    from: PositionName, 
    to: PositionName,
    enPassantSquare: PositionName | null,
    promoteTo?: Piece,
) : MoveTuple {

    const boardCache = cache.get(previousBoard) 
        ?? cache.set(previousBoard, new Map())
            .get(previousBoard) as Map<string, MoveTuple>;

    const other = otherPlayer(playerAt(previousBoard, from)!);
    const pieceThere = pieceAt(previousBoard, to);

    const isEpCapture = enPassantSquare === to && isPawn(pieceAt(previousBoard, from));
    const captured = isEpCapture
        ? other === "Black" ? "BP" : "WP"
        : pieceThere ? shorthand(pieceThere) : ''

    const ep = isEpCapture ? 'ep' : '';
    const captStr = captured ? `-x${captured}${ep}` : '';

    const promoStr = promoteTo ? `(${shorthand(promoteTo)})` : ''
    
    const moveHash = `${from}-${to}${captStr}${promoStr}`;

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

    const castling = castlings[`${movedPiece}-${from}-${to}`];
    if(castling){
        //move the castle:
        const castlingTuple = move(newBoard, castling[0], castling[1], null);
        boardCache.set(moveHash, castlingTuple)
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