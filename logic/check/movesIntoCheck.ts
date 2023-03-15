import { move }  from 'logic/board';
import { isInCheck }  from 'logic/check';
import { playerAt }  from 'logic/squares';
import { Square }  from 'logic/squares/square';
import { Board }  from 'logic/types/Board';

function movesIntoCheck(
    board: Board, 
    moveFrom: Square, 
    moveTo: Square)
    : boolean {
   
    const player = playerAt(board, moveFrom);
    const [nextBoard] = move(board, moveFrom, moveTo, null);
    
    return player ? isInCheck(nextBoard, player) : false;
}

export default movesIntoCheck;