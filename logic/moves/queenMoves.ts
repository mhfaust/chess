import { Square }  from 'logic/positions/square';
import { rookMoves, bishopMoves }  from 'logic/moves'
import { Board }  from 'logic/types/Board';

function queen(
    board: Board, 
    moveFrom: Square, 
): Set<Square> {

    return new Set([
        ...Array.from(rookMoves(board, moveFrom)),
        ...Array.from(bishopMoves(board, moveFrom))
    ]);
}

export default queen;