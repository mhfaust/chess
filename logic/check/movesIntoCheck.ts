import { move }  from 'logic/board';
import { isInCheck }  from 'logic/check';
import { playerAt }  from 'logic/squares';
import { Square }  from 'logic/squares/square';
import { Position }  from 'logic/types/Board';

function movesIntoCheck(
    position: Position, 
    moveFrom: Square, 
    moveTo: Square)
    : boolean {
   
    const player = playerAt(position, moveFrom);
    const [nextBoard] = move(position, moveFrom, moveTo, null);
    
    return player ? isInCheck(nextBoard, player) : false;
}

export default movesIntoCheck;