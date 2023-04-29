import { 
    playerAt, 
    displaceTo, 
    isUnOccupied, 
    isOccupiedByPlayer,
    otherPlayer,  
} from 'logic/squares';
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Square }  from 'logic/squares/square';
import { Position }  from 'logic/types/Board';

function rook(position: Position, moveFrom: Square): Set<Square> {
    
    const player = playerAt(position, moveFrom);
    if (!player){
        return new Set();
    }
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    const legalMoves : Array<Square> = [];

    directions.forEach((direction) => {
        let examinedSquare = displaceTo(moveFrom, direction);

        while(examinedSquare && isUnOccupied(position, examinedSquare)){
            legalMoves.push(examinedSquare);
            examinedSquare = displaceTo(examinedSquare, direction);
        }
        if (examinedSquare && 
            isOccupiedByPlayer(position, examinedSquare, otherPlayer(player))
        ) {
            legalMoves.push(examinedSquare);
        }
    });

    return new Set(legalMoves
        .filter(square => !movesIntoCheck(position, moveFrom, square))
    );
}

export default rook;