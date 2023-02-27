import { PositionName }  from 'rules/positions/positionName';
import { rookMoves, bishopMoves }  from 'rules/moves'
import { Board }  from 'rules/types/Board';

function queen(
    board: Board, 
    moveFrom: PositionName, 
): Set<PositionName>{
    return new Set([
        ...rookMoves(board, moveFrom), 
        ...bishopMoves(board, moveFrom)
    ]);
}

export default queen;