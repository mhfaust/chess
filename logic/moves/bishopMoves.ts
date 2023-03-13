import { 
    playerAt, 
    displaceTo, 
    isUnOccupied, 
    isOccupiedByPlayer, 
    otherPlayer, 
} from 'logic/positions';

import { bishopVectors }  from 'logic/constants/move-vectors'
import { movesIntoCheck }  from 'logic/check';
import { PositionName }  from 'logic/positions/positionName';
import { Board }  from 'logic/types/Board';
import { MoveVector } from 'logic/types/MoveVector';

const emptySet = new Set<PositionName>();

function bishop(
    board: Board, 
    moveFrom: PositionName
): Set<PositionName> {

    const player = playerAt(board, moveFrom);
    if(!player){
        return emptySet;
    }
    const legalMoves: Array<PositionName> = [];

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