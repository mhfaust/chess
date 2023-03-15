import { 
    playerAt, 
    isUnOccupiedByPlayer, 
    displaceTo 
} from 'logic/positions';

import { knightVectors }  from 'logic/constants/move-vectors'
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Square }  from 'logic/positions/square';
import { Board }  from 'logic/types/Board';

const emptySet = new Set<Square>();

function knight(
    board: Board, 
    moveFrom: Square, 
): Set<Square> {

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
    ) as Set<Square>;
}

export default knight;