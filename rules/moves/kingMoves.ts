import { 
    playerAt, 
    isOnBoard, 
    isUnOccupiedByPlayer, 
    displaceTo, 
    pieceAt}  from 'rules/positions';
import { kingVectors }  from 'rules/constants/move-vectors'
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';
import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';

function kingMoves (
    board: Board, 
    kingFrom: PositionName, 
    castlingPreclusions: CastlingPreclusions
): Set<PositionName> {

    const player = playerAt(board, kingFrom);

    const legalMoves = new Set(
        kingVectors
            .map(vector => displaceTo(kingFrom, vector))
            .filter(isOnBoard)
            .filter(targetPosition => isUnOccupiedByPlayer(board, targetPosition, player))
            .filter(kingTo => !movesIntoCheck(board, kingFrom, kingTo))
    );

    //castling moves:
    if (player === 'White' && kingFrom == 'E1') {
        if(!castlingPreclusions.has('H1') 
            && pieceAt(board, 'F1') === null 
            && pieceAt(board, 'G1') === null
            && !movesIntoCheck(board, 'E1', 'F1')
            && !movesIntoCheck(board, 'E1', 'G1')
        ){
            legalMoves.add('G1');
        }
        if(!castlingPreclusions.has('A1') 
            && pieceAt(board, 'B1') === null 
            && pieceAt(board, 'C1') === null
            && pieceAt(board, 'D1') === null
            && !movesIntoCheck(board, 'E1', 'C1')
            && !movesIntoCheck(board, 'E1', 'D1')
        ){
            legalMoves.add('C1');
        }
    }
    if (player === 'Black' && kingFrom === 'E8') {
        if(!castlingPreclusions.has('H8') 
            && pieceAt(board, 'F8') === null
            && pieceAt(board, 'G8') === null
            && !movesIntoCheck(board, 'E8', 'F8')
            && !movesIntoCheck(board, 'E8', 'G8')
        ){
            legalMoves.add('G8');
        }
        if(!castlingPreclusions.has('A8') 
            && pieceAt(board, 'B8') === null
            && pieceAt(board, 'C8') === null
            && pieceAt(board, 'D8') === null
            && !movesIntoCheck(board, 'E8', 'C8')
            && !movesIntoCheck(board, 'E8', 'D8')
        ){
            legalMoves.add('C8');
        }
    }
    return legalMoves;
}

export default kingMoves;