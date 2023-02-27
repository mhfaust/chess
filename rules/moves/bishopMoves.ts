import { 
    playerAt, 
    displaceTo, 
    isOnBoard, 
    isUnOccupied, 
    isOccupiedByPlayer, 
    otherPlayer, 
} from 'rules/positions';

import { bishopVectors }  from 'rules/constants/move-vectors'
import { movesIntoCheck }  from 'rules/check';
import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';

function bishop(
    board: Board, 
    moveFrom: PositionName
): Set<PositionName> {

    const player = playerAt(board, moveFrom);
    const legalMoves: Array<PositionName> = [];

    bishopVectors.forEach((vector: MoveVector): void => {

        let examinedPosition = displaceTo(moveFrom, vector);

        while(isOnBoard(examinedPosition) && isUnOccupied(board, examinedPosition)){
            legalMoves.push(examinedPosition);
            examinedPosition = displaceTo(examinedPosition, vector);
        }
        if(isOnBoard(examinedPosition) && isOccupiedByPlayer(board, examinedPosition, otherPlayer(player))){
            legalMoves.push(examinedPosition);
        }
    });

    return new Set(legalMoves
        .filter(moveTo => !movesIntoCheck(board, moveFrom, moveTo))
    );
}

export default bishop;