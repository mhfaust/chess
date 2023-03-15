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

        let examinedPosition = displaceTo(moveFrom, vector);

        while(examinedPosition && isUnOccupied(board, examinedPosition)){
            legalMoves.push(examinedPosition);
            examinedPosition = displaceTo(examinedPosition, vector);
        }
        if(examinedPosition && isOccupiedByPlayer(board, examinedPosition, otherPlayer(player))){
            legalMoves.push(examinedPosition);
        }
    });

    return new Set(legalMoves
        .filter(moveTo => !movesIntoCheck(board, moveFrom, moveTo))
    );
}

export default bishop;