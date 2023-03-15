import { 
    playerAt, 
    displaceTo, 
    isUnOccupied, 
    isOccupiedByPlayer,
    otherPlayer,  
} from 'logic/squares';
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Square }  from 'logic/squares/square';
import { Board }  from 'logic/types/Board';

function rook(board: Board, moveFrom: Square): Set<Square> {
    
    const player = playerAt(board, moveFrom);
    if (!player){
        return new Set();
    }
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    const legalMoves : Array<Square> = [];

    directions.forEach((direction) => {
        let examinedSquare = displaceTo(moveFrom, direction);

        while(examinedSquare && isUnOccupied(board, examinedSquare)){
            legalMoves.push(examinedSquare);
            examinedSquare = displaceTo(examinedSquare, direction);
        }
        if (examinedSquare && 
            isOccupiedByPlayer(board, examinedSquare, otherPlayer(player))
        ) {
            legalMoves.push(examinedSquare);
        }
    });

    return new Set(legalMoves
        .filter(position => !movesIntoCheck(board, moveFrom, position))
    );
}

export default rook;