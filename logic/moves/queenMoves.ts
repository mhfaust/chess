import { Square }  from 'logic/squares/square';
import { rookMoves, bishopMoves }  from 'logic/moves'
import { Position }  from 'logic/types/Board';

function queen(
    position: Position, 
    moveFrom: Square, 
): Set<Square> {

    return new Set([
        ...Array.from(rookMoves(position, moveFrom)),
        ...Array.from(bishopMoves(position, moveFrom))
    ]);
}

export default queen;