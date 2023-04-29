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
import { Position }  from 'logic/types/Position';
import { MoveVector } from 'logic/types/MoveVector';

const emptySet = new Set<Square>();

function bishop(
    position: Position, 
    moveFrom: Square
): Set<Square> {

    const player = playerAt(position, moveFrom);
    if(!player){
        return emptySet;
    }
    const legalMoves: Array<Square> = [];

    bishopVectors.forEach((vector: MoveVector): void => {

        let examinedSquare = displaceTo(moveFrom, vector);

        while(examinedSquare && isUnOccupied(position, examinedSquare)){
            legalMoves.push(examinedSquare);
            examinedSquare = displaceTo(examinedSquare, vector);
        }
        if(examinedSquare && isOccupiedByPlayer(position, examinedSquare, otherPlayer(player))){
            legalMoves.push(examinedSquare);
        }
    });

    return new Set(legalMoves
        .filter(moveTo => !movesIntoCheck(position, moveFrom, moveTo))
    );
}

export default bishop;