import { 
    playerAt, 
    isUnOccupiedByPlayer, 
    displaceTo 
} from 'rules/positions';

import { knightVectors }  from 'rules/constants/move-vectors'
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';

const emptySet = new Set<PositionName>();

function knight(
    board: Board, 
    moveFrom: PositionName, 
): Set<PositionName> {

    const player = playerAt(board, moveFrom);
    if(!player){
        return emptySet;
    }
    return new Set(
        knightVectors
            .map(vector => displaceTo(moveFrom, vector))
            .filter(i => i !== null)
            .filter(targetPosition => isUnOccupiedByPlayer(board, targetPosition!, player))
            .filter(position => !movesIntoCheck(board, moveFrom, position!))
    ) as Set<PositionName>;
}

export default knight;