import { move }  from 'logic/board';
import { isInCheck }  from 'logic/check';
import { playerAt }  from 'logic/positions';
import { PositionName }  from 'logic/positions/positionName';
import { Board }  from 'logic/types/Board';

function movesIntoCheck(
    board: Board, 
    moveFrom: PositionName, 
    moveTo: PositionName)
    : boolean {
   
    const player = playerAt(board, moveFrom);
    const [nextBoard] = move(board, moveFrom, moveTo, null);
    
    return player ? isInCheck(nextBoard, player) : false;
}

export default movesIntoCheck;