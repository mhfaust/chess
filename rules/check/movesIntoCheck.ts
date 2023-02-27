import { move }  from 'rules/board';
import { isInCheck }  from 'rules/check';
import { playerAt }  from 'rules/positions';
import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';

function movesIntoCheck(
    board: Board, 
    moveFrom: PositionName, 
    moveTo: PositionName)
    : boolean {
   
    const player = playerAt(board, moveFrom);
    const nextBoard = move(board, moveFrom, moveTo);

    return isInCheck(nextBoard, player);
}

export default movesIntoCheck;