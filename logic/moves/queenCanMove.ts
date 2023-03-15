import {
    rookCanMove,
    bishopCanMove } from 'logic/moves';
import { Square }  from 'logic/squares/square';
import { Board }  from 'logic/types/Board';

function queenCanMove (
    board: Board, 
    fromSquare: Square, 
    toSquare: Square, 
): boolean {
    
    return rookCanMove(board, fromSquare, toSquare)
        || bishopCanMove(board, fromSquare, toSquare);
}

export default queenCanMove;