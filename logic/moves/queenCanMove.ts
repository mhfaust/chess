import {
    rookCanMove,
    bishopCanMove } from 'logic/moves';
import { Square }  from 'logic/squares/square';
import { Position }  from 'logic/types/Board';

function queenCanMove (
    position: Position, 
    fromSquare: Square, 
    toSquare: Square, 
): boolean {
    
    return rookCanMove(position, fromSquare, toSquare)
        || bishopCanMove(position, fromSquare, toSquare);
}

export default queenCanMove;