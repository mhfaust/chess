import { 
    playerAt, 
    isUnOccupiedByPlayer, 
    displaceTo, 
}  from 'rules/positions';
import { kingVectors }  from 'rules/constants/move-vectors'
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';
import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';
import areEmpty from 'rules/moves/areEmpty';
import { isInCheck } from 'rules/check';

const emptySet = new Set<PositionName>();

function kingMoves (
    board: Board, 
    kingFrom: PositionName, 
    castlingPreclusions: CastlingPreclusions
): Set<PositionName> {

    const player = playerAt(board, kingFrom);
    if(!player){
        return emptySet;
    }

    const legalMoves = new Set(
        Array.from(kingVectors
            .map(vector => displaceTo(kingFrom, vector))
            .filter(i => i !== null)
            .filter(targetPosition => isUnOccupiedByPlayer(board, targetPosition!, player))
            .filter(kingTo => !movesIntoCheck(board, kingFrom, kingTo!))
        )
    ) as Set<PositionName>;

    //finish & don't look for castling moves if they're in check:
    if(isInCheck(board, player)){
        return legalMoves;
    }

    //castling moves:
    if (player === 'White' && kingFrom == 'E1') {
        if(!castlingPreclusions?.has('H1') 
            && areEmpty(board, 'F1', 'G1')
            && !movesIntoCheck(board, 'E1', 'F1')
            && !movesIntoCheck(board, 'E1', 'G1')
        ){
            legalMoves.add('G1');
        }
        if(!castlingPreclusions?.has('A1') 
            && areEmpty(board, 'B1', 'C1', 'D1')
            && !movesIntoCheck(board, 'E1', 'C1')
            && !movesIntoCheck(board, 'E1', 'D1')
        ){
            legalMoves.add('C1');
        }
    }
    if (player === 'Black' && kingFrom === 'E8') {
        if(!castlingPreclusions?.has('H8') 
            && areEmpty(board, 'F8', 'G8')
            && !movesIntoCheck(board, 'E8', 'F8')
            && !movesIntoCheck(board, 'E8', 'G8')
        ){
            legalMoves.add('G8');
        }
        if(!castlingPreclusions?.has('A8') 
            && areEmpty(board, 'B8', 'C8', 'D8')
            && !movesIntoCheck(board, 'E8', 'C8')
            && !movesIntoCheck(board, 'E8', 'D8')
        ){
            legalMoves.add('C8');
        }
    }
    return legalMoves;
}

export default kingMoves;