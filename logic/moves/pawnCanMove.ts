import { 
    rank, 
    file, 
    playerAt, 
    isOccupied, 
    isUnOccupied, 
    isOccupiedByPlayer, 
    square
} from 'logic/positions';
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/positions/positionName';

function pawnCanMove (
        board: Board, 
        from: Square, 
        to: Square, 
        enPassantSquare: Square | null)
    : boolean {

    const player = playerAt(board, from);
    if (!player) {
        return false;
    }
    const forwardDirection = player === 'White' ? 1 : -1;
    const stepsForward = (rank(to) - rank(from)) * forwardDirection;
    const stepsSideways = file(to) - file(from);
      
    if(stepsForward < 1 || stepsForward > 2 || Math.abs(stepsSideways) > 1){
        return false;
    }
    //forward, can't capture or be blocked:
    if( stepsSideways === 0){
        
        if(isOccupied(board, to)){
            return false;
        }
        if(stepsForward === 2){
            if(player === 'Black' && rank(from) !== 6){
                return false;
            }
            if(player === 'White' && rank(from) !== 1){
                return false;
            }
            //cannot jump over any piece
            const jumpedCoords = [file(from), rank(from) + forwardDirection];
            if(isOccupied(board, square(jumpedCoords)!)){
                return false;
            }
        }
    }
    
    //diagonal, must capture:
    else {
        if(stepsForward !== 1){
            return false;
        }
        if(isUnOccupied(board, to) && (to !== enPassantSquare)){
            return false;
        }
        if(isOccupiedByPlayer(board, to, player)){
            return false;
        }
    }
    
    if (movesIntoCheck(board, from, to)) {
        return false;
    }

    return true;
}

export default pawnCanMove;