import { 
    file, 
    rank, 
    isOnBoard, 
    playerAt, 
    isOccupied, 
    displaceTo } from 'rules/positions'
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';

function bishopCanMove (
    board: Board, 
    fromPosition: PositionName, 
    toPosition: PositionName)
    : boolean {

    if(!isOnBoard(toPosition))
        return false;
    
    const thisPlayer = playerAt(board, toPosition);

    //can't move there if it's occupied by one of player's own pieces:
    if (thisPlayer === playerAt(board, fromPosition))
        return false;
    
    const fileMove = file(toPosition) - file(fromPosition);
    const rankMove = rank(toPosition) - rank(fromPosition);

    //if neither file and rank were changed then
    //it's not a valid bishop move:
    if(fileMove === 0 || rankMove === 0)
        return false;

    //diagonal move means rank and file changed by the same amount:
    if(Math.abs(fileMove) !== Math.abs(rankMove))
        return false;

    const moveVector = [Math.sign(fileMove),  Math.sign(rankMove)]
    //start checking one step out from the move-from position
    let step = displaceTo(fromPosition, moveVector);

    //and keep checking until we run into a piece or the move-to position:
    while(step && step !== toPosition){
        if(isOccupied(board, step)){
            return false;
        }
        step = displaceTo(step, moveVector);
    }

    if(movesIntoCheck(board, fromPosition, toPosition)){
        return false;
    }

    return true;
}

export default bishopCanMove;