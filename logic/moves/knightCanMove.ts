import { isOnBoard, playerAt, file, rank }  from 'logic/squares'
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/squares/square';

function knightCanMove (
    board: Board, 
    fromSquare: Square, 
    toSquare: Square, 
  ) {

    if(!isOnBoard(toSquare))
        return false;
            
    //can't move there if it's occupied by one of player's own pieces:
    if (playerAt(board, toSquare) === playerAt(board, fromSquare))
        return false;
        
    const rectangularAreaOfDisplacement = Math.abs(
        (file(fromSquare) - file(toSquare)) * 
        (rank(fromSquare) - rank(toSquare))
    );

    //Given the discrete nature of board moves, 
    //this can only be true if moved 1 space in one direction 
    //and 2 spaces in the orthogonal direction (i.e. how a knight moves):
    if(rectangularAreaOfDisplacement !== 2)
        return false;

    if(movesIntoCheck(board, fromSquare, toSquare)){
        return false;
    }

    return true;
}

export default knightCanMove;