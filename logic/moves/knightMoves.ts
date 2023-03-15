import { 
    playerAt, 
    isUnOccupiedByPlayer, 
    displaceTo 
} from 'logic/squares';

import { knightVectors }  from 'logic/constants/move-vectors'
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { Square }  from 'logic/squares/square';
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
            .filter(targetSquare => isUnOccupiedByPlayer(board, targetSquare!, player))
            .filter(square => !movesIntoCheck(board, moveFrom, square!))
    ) as Set<Square>;
}

export default knight;