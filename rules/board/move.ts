import { file, rank, pieceAt }  from 'rules/positions';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';
import enPassantSquare, { pawnPositionFromEpSquare } from 'rules/moves/enPassantSquare';
import COORDS from 'rules/positions/coordinates';
import { Piece } from 'rules/positions/piece';

const castlings: Record<string, [PositionName, PositionName] | undefined> = {
    'White King-E1-C1': ['A1', 'D1'],
    'White King-E1-G1': ['H1', 'F1'],
    'Black King-E8-C8': ['A8', 'D8'],
    'Black King-E8-G8': ['H8', 'F8'],
};

const cache = new Map<Board, Map<string, Board>>();

/** Does not validate the move (to may be occupied, may be in check, etc.) */
function move ( 
    previousBoard: Board, 
    from: PositionName, 
    to: PositionName,
    enPassantSquare?: PositionName | null,
    promoteTo?: Piece,
) : Board {

    const boardCache = cache.get(previousBoard) 
        ?? cache.set(previousBoard, new Map()).get(previousBoard) as Map<string, Board>;
    const moveHash = `from:${from};to:${to};ep:${enPassantSquare || 'n/a'};promote-to:${promoteTo || 'n/a'}`;
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
        const castlingBoard = move(newBoard, castling[0], castling[1]);
        boardCache.set(moveHash, castlingBoard)
        return castlingBoard;
    }

    if(to === enPassantSquare){
        const pawnPosition = pawnPositionFromEpSquare.get(to)!;
        const [file, rank] = COORDS[pawnPosition];
        newBoard[file][rank] = null; //mutate
    }

    if(promoteTo){
        const [file, rank] = COORDS[to];
        newBoard[file][rank] = promoteTo; //mutate
    }
    
    boardCache.set(moveHash, newBoard);
    return newBoard;
}

export default move;