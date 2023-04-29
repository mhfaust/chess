import { 
    rank, 
    file, 
    isOnBoard, 
    playerAt, 
    isOccupied, 
    displaceTo } from 'logic/squares';
    
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Position }  from 'logic/types/Position';
import { Square }  from 'logic/squares/square';

function rookCanMove (
    position: Position, 
    from: Square, 
    to: Square, 
) : boolean {

    if(!isOnBoard(to)){
        return false;
    }
           
    //can't move there if it's occupied by one of player's own pieces:
    if (playerAt(position, to) === playerAt(position, from)){
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
        
        if(isOccupied(position, step)){
            return false;
        }
            
         step = displaceTo(step, moveVector);
    }
    
    if(movesIntoCheck(position, from, to)){
        return false;
    }

    return true;
}

export default rookCanMove;