import { 
    playerAt, 
    displaceTo, 
    isUnOccupied, 
    isOccupiedByPlayer, 
    otherPlayer, 
} from 'logic/squares';

import { bishopVectors }  from 'logic/constants/move-vectors'
import { movesIntoCheck }  from 'logic/check';
import { Square }  from 'logic/squares/square';
import { Board }  from 'logic/types/Board';
import { MoveVector } from 'logic/types/MoveVector';

const emptySet = new Set<Square>();

function bishop(
    board: Board, 
    moveFrom: Square
): Set<Square> {

    const player = playerAt(board, moveFrom);
    if(!player){
        return emptySet;
    }
    const legalMoves: Array<Square> = [];

    bishopVectors.forEach((vector: MoveVector): void => {

        let examinedSquare = displaceTo(moveFrom, vector);

        while(examinedSquare && isUnOccupied(board, examinedSquare)){
            legalMoves.push(examinedSquare);
            examinedSquare = displaceTo(examinedSquare, vector);
        }
        if(examinedSquare && isOccupiedByPlayer(board, examinedSquare, otherPlayer(player))){
            legalMoves.push(examinedSquare);
        }
    });

    return new Set(legalMoves
        .filter(moveTo => !movesIntoCheck(board, moveFrom, moveTo))
    );
}

export default bishop;