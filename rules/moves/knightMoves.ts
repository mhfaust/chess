import { 
    playerAt, 
    isOnBoard, 
    isUnOccupiedByPlayer, 
    displaceTo 
} from 'rules/positions';

import { knightVectors }  from 'rules/constants/move-vectors'
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';

function knight(
    board: Board, 
    moveFrom: PositionName, 
): Set<PositionName> {

    const player = playerAt(board, moveFrom);

    return new Set(
        knightVectors
            .map(vector => displaceTo(moveFrom, vector))
            .filter(isOnBoard)
            .filter(targetPosition => isUnOccupiedByPlayer(board, targetPosition, player))
            .filter(position => !movesIntoCheck(board, moveFrom, position))
    );
}

export default knight;