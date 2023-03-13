import {
    rookCanMove,
    bishopCanMove } from 'rules/moves';
import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';

function queenCanMove (
    board: Board, 
    fromPosition: PositionName, 
    toPosition: PositionName, 
): boolean {
    
    return rookCanMove(board, fromPosition, toPosition)
        || bishopCanMove(board, fromPosition, toPosition);
}

export default queenCanMove;