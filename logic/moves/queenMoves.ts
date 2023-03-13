import { PositionName }  from 'logic/positions/positionName';
import { rookMoves, bishopMoves }  from 'logic/moves'
import { Board }  from 'logic/types/Board';

function queen(
    board: Board, 
    moveFrom: PositionName, 
): Set<PositionName> {

    return new Set([
        ...Array.from(rookMoves(board, moveFrom)),
        ...Array.from(bishopMoves(board, moveFrom))
    ]);
}

export default queen;