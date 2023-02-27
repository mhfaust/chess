import { isOnBoard, playerAt, file, rank }  from 'rules/positions'
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';

function knightCanMove (
    board: Board, 
    fromPosition: PositionName, 
    toPosition: PositionName, 
  ) {

    if(!isOnBoard(toPosition))
        return false;
            
    //can't move there if it's occupied by one of player's own pieces:
    if (playerAt(board, toPosition) === playerAt(board, fromPosition))
        return false;
        
    const rectangularAreaOfDisplacement = Math.abs(
        (file(fromPosition) - file(toPosition)) * 
        (rank(fromPosition) - rank(toPosition))
    );

    //Given the discrete nature of board moves, 
    //this can only be true if moved 1 space in one direction 
    //and 2 spaces in the orthogonal direction (i.e. how a knight moves):
    if(rectangularAreaOfDisplacement !== 2)
        return false;

    if(movesIntoCheck(board, fromPosition, toPosition)){
        return false;
    }

    return true;
}

export default knightCanMove;