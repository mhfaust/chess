import {
    rookCanMove,
    bishopCanMove } from 'logic/moves';
import { PositionName }  from 'logic/positions/positionName';
import { Board }  from 'logic/types/Board';

function queenCanMove (
    board: Board, 
    fromPosition: PositionName, 
    toPosition: PositionName, 
): boolean {
    
    return rookCanMove(board, fromPosition, toPosition)
        || bishopCanMove(board, fromPosition, toPosition);
}

export default queenCanMove;