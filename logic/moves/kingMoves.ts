import { 
    playerAt, 
    isUnOccupiedByPlayer, 
    displaceTo, 
}  from 'logic/squares';
import { kingVectors }  from 'logic/constants/move-vectors'
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';
import { Square }  from 'logic/squares/square';
import { Board }  from 'logic/types/Board';
import areEmpty from 'logic/moves/areEmpty';
import { isInCheck } from 'logic/check';

const emptySet = new Set<Square>();

function kingMoves (
    board: Board, 
    kingFrom: Square, 
    castlingPreclusions: CastlingPreclusions
): Set<Square> {

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
    ) as Set<Square>;

    //finish & don't look for castling moves if they're in check:
    if(isInCheck(board, player)){
        return legalMoves;
    }

    //castling moves:
    if (player === 'White' && kingFrom == 'e1') {
        if(!castlingPreclusions?.has('h1') 
            && areEmpty(board, 'f1', 'g1')
            && !movesIntoCheck(board, 'e1', 'f1')
            && !movesIntoCheck(board, 'e1', 'g1')
        ){
            legalMoves.add('g1');
        }
        if(!castlingPreclusions?.has('a1') 
            && areEmpty(board, 'b1', 'c1', 'd1')
            && !movesIntoCheck(board, 'e1', 'c1')
            && !movesIntoCheck(board, 'e1', 'd1')
        ){
            legalMoves.add('c1');
        }
    }
    if (player === 'Black' && kingFrom === 'e8') {
        if(!castlingPreclusions?.has('h8') 
            && areEmpty(board, 'f8', 'g8')
            && !movesIntoCheck(board, 'e8', 'f8')
            && !movesIntoCheck(board, 'e8', 'g8')
        ){
            legalMoves.add('g8');
        }
        if(!castlingPreclusions?.has('a8') 
            && areEmpty(board, 'b8', 'c8', 'd8')
            && !movesIntoCheck(board, 'e8', 'c8')
            && !movesIntoCheck(board, 'e8', 'd8')
        ){
            legalMoves.add('c8');
        }
    }
    return legalMoves;
}

export default kingMoves;