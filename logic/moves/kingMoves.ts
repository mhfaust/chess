import { 
    playerAt, 
    isUnOccupiedByPlayer, 
    displaceTo, 
}  from 'logic/squares';
import { kingVectors }  from 'logic/constants/move-vectors'
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';
import { Square }  from 'logic/squares/square';
import { Position }  from 'logic/types/Board';
import areEmpty from 'logic/moves/areEmpty';
import { isInCheck } from 'logic/check';

const emptySet = new Set<Square>();

function kingMoves (
    position: Position, 
    kingFrom: Square, 
    castlingPreclusions: CastlingPreclusions
): Set<Square> {

    const player = playerAt(position, kingFrom);
    if(!player){
        return emptySet;
    }

    const legalMoves = new Set(
        Array.from(kingVectors
            .map(vector => displaceTo(kingFrom, vector))
            .filter(i => i !== null)
            .filter(targetSquare => isUnOccupiedByPlayer(position, targetSquare!, player))
            .filter(kingTo => !movesIntoCheck(position, kingFrom, kingTo!))
        )
    ) as Set<Square>;

    //finish & don't look for castling moves if they're in check:
    if(isInCheck(position, player)){
        return legalMoves;
    }

    //castling moves:
    if (player === 'White' && kingFrom == 'e1') {
        if(!castlingPreclusions?.has('h1') 
            && areEmpty(position, 'f1', 'g1')
            && !movesIntoCheck(position, 'e1', 'f1')
            && !movesIntoCheck(position, 'e1', 'g1')
        ){
            legalMoves.add('g1');
        }
        if(!castlingPreclusions?.has('a1') 
            && areEmpty(position, 'b1', 'c1', 'd1')
            && !movesIntoCheck(position, 'e1', 'c1')
            && !movesIntoCheck(position, 'e1', 'd1')
        ){
            legalMoves.add('c1');
        }
    }
    if (player === 'Black' && kingFrom === 'e8') {
        if(!castlingPreclusions?.has('h8') 
            && areEmpty(position, 'f8', 'g8')
            && !movesIntoCheck(position, 'e8', 'f8')
            && !movesIntoCheck(position, 'e8', 'g8')
        ){
            legalMoves.add('g8');
        }
        if(!castlingPreclusions?.has('a8') 
            && areEmpty(position, 'b8', 'c8', 'd8')
            && !movesIntoCheck(position, 'e8', 'c8')
            && !movesIntoCheck(position, 'e8', 'd8')
        ){
            legalMoves.add('c8');
        }
    }
    return legalMoves;
}

export default kingMoves;