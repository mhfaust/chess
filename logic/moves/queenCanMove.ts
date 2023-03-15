import {
    rookCanMove,
    bishopCanMove } from 'logic/moves';
import { Square }  from 'logic/positions/square';
import { Board }  from 'logic/types/Board';

function queenCanMove (
    board: Board, 
    fromPosition: Square, 
    toPosition: Square, 
): boolean {
    
    return rookCanMove(board, fromPosition, toPosition)
        || bishopCanMove(board, fromPosition, toPosition);
}

export default queenCanMove;