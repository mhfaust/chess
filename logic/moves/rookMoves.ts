import { 
    playerAt, 
    displaceTo, 
    isUnOccupied, 
    isOccupiedByPlayer,
    otherPlayer,  
} from 'logic/positions';
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Square }  from 'logic/positions/square';
import { Board }  from 'logic/types/Board';

function rook(board: Board, moveFrom: Square): Set<Square> {
    
    const player = playerAt(board, moveFrom);
    if (!player){
        return new Set();
    }
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    const legalMoves : Array<Square> = [];

    directions.forEach((direction) => {
        let examinedPosition = displaceTo(moveFrom, direction);

        while(examinedPosition && isUnOccupied(board, examinedPosition)){
            legalMoves.push(examinedPosition);
            examinedPosition = displaceTo(examinedPosition, direction);
        }
        if (examinedPosition && 
            isOccupiedByPlayer(board, examinedPosition, otherPlayer(player))
        ) {
            legalMoves.push(examinedPosition);
        }
    });

    return new Set(legalMoves
        .filter(position => !movesIntoCheck(board, moveFrom, position))
    );
}

export default rook;