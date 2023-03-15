import { 
    rank, 
    file, 
    isOnBoard, 
    playerAt, 
    isOccupied, 
    displaceTo } from 'logic/positions';
    
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/positions/square';

function rookCanMove (
    board: Board, 
    from: Square, 
    to: Square, 
) : boolean {

    if(!isOnBoard(to)){
        return false;
    }
           
    //can't move there if it's occupied by one of player's own pieces:
    if (playerAt(board, to) === playerAt(board, from)){
        return false;
    }
    
    // how much moved in each direction:
    const fileMove = file(to) - file(from); 
    const rankMove = rank(to) - rank(from);

    //if both or neither file and rank were changed, 
    //it's not a valid rook move:
    if(to === from || (fileMove !== 0 && rankMove !== 0)) {
        return false;
    }

    const moveVector = [Math.sign(fileMove),  Math.sign(rankMove)]

    let step = displaceTo(from, moveVector);
        
    while(step && step !== to){
        
        if(isOccupied(board, step)){
            return false;
        }
            
         step = displaceTo(step, moveVector);
    }
    
    if(movesIntoCheck(board, from, to)){
        return false;
    }

    return true;
}

export default rookCanMove;