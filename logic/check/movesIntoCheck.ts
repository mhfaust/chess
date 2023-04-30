import { nextPosition }  from 'logic/position';
import { isInCheck }  from 'logic/check';
import { playerAt }  from 'logic/squares';
import { Square }  from 'logic/squares/square';
import { Position }  from 'logic/types/Position';

function movesIntoCheck(
    position: Position, 
    moveFrom: Square, 
    moveTo: Square)
    : boolean {
   
    const player = playerAt(position, moveFrom);
    const [next] = nextPosition(position, moveFrom, moveTo, null);
    
    return player ? isInCheck(next, player) : false;
}

export default movesIntoCheck;