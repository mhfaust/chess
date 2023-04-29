 import { 
    playerAt, 
    displaceTo, 
    isUnOccupied, 
    isOccupiedByPlayer, 
    otherPlayer, 
    rank
} from 'logic/squares';
import { isInCheck }  from 'logic/check';
import { move }  from 'logic/board';
import { Square }  from 'logic/squares/square';
import { Position }  from 'logic/types/Board';
import { MoveVector } from 'logic/types/MoveVector';

const emptySet = new Set<Square>();

function pawn(
    position: Position, 
    moveFrom: Square, 
    enPassantSquare: Square | null)
    : Set<Square> {
    const player = playerAt(position, moveFrom);
    if(!player){
        return emptySet;
    }
    const legalMoves: Set<Square> = new Set();
    const forwardDirection = player === 'White' ? 1 : -1;
    const initialRank = rank(moveFrom);
    const forward1 = displaceTo(moveFrom, [0, forwardDirection]);

    const moveNotInCheck = (moveTo: Square): boolean => !isInCheck(move(position, moveFrom, moveTo, null)[0], player)
     
    //advance moves
    if(forward1 && isUnOccupied(position, forward1) && moveNotInCheck(forward1)){
        legalMoves.add(forward1);
        
        //can only advance if the pawn has never moved.
        //Also note, we only test if we already know the first space is clear
        const pawnHasNotMoved = (player === 'White' && initialRank === 1) || (player === 'Black' && initialRank === 6)
        if(pawnHasNotMoved){
            const forward2 = displaceTo(moveFrom, [0, 2 * forwardDirection]);
            if(forward1 && forward2 && isUnOccupied(position, forward2) && moveNotInCheck(forward2)){
                legalMoves.add(forward2);
            }
        }
    }
    const moveVectors: Array<MoveVector> = [ [-1,forwardDirection], [1,forwardDirection] ];
    const opponent = otherPlayer(player)

    //attack moves
    moveVectors.forEach(vector => {
        const attackedSquare = displaceTo(moveFrom, vector);
        if(!attackedSquare){
            return;
        }
        if(
            isOccupiedByPlayer(position, attackedSquare, opponent)
            || (attackedSquare === enPassantSquare)
        ){
                if(moveNotInCheck(attackedSquare)){
                    legalMoves.add(attackedSquare);
                }
        }
    });

    return legalMoves;
}

export default pawn;