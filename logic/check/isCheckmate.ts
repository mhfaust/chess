import { 
    generateLinesOfAttack, 
    movesIntoCheck } from 'logic/check';

import { 
    displaceTo, 
    otherPlayer, 
    playerAt, 
    square,
} from 'logic/squares';
    
import { kingVectors }  from 'logic/constants/move-vectors';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import kingSquare  from 'logic/squares/kingSquare';
import { Square } from 'logic/squares/square';
import { GridCoordinates } from 'logic/types/GridCoordinates';
import { MoveVector } from 'logic/types/MoveVector';

const cache = new Map<Player, Map<Board, boolean>>()
    .set('Black', new Map())
    .set('White', new Map());

function isCheckmate(
    board: Board, 
    defender: Player
): boolean {

    const playerCache = cache.get(defender);
    const cached = playerCache?.get(board);
    if (cached) {
        return cached;
    }

    const kingPos = kingSquare(board, defender);

    //is there any way to get out of check by moving the king?
    for (let i = 0; i < kingVectors.length; i++) {
        const vector: MoveVector = kingVectors[i];
        const kingMovesTo = displaceTo(kingPos, vector);

        if(kingMovesTo && playerAt(board, kingMovesTo) !== defender){
            if( !movesIntoCheck(board, kingPos, kingMovesTo)){
                playerCache?.set(board, false);
                return false;
            } 
        }   
    }

    const attackLines = generateLinesOfAttack(board, defender, kingPos);
    const checkLine: IteratorResult<GridCoordinates[], GridCoordinates[]> = attackLines.next();
    if (checkLine.value === null) {
        //Not checkmate if they're not in check!
        playerCache?.set(board, false);
        return false;
    }
    
    //There's no way to remove check from 2 pieces w/o moving the king,
    //which we just looked for, above.
    const secondLine = attackLines.next();
    //So if there's a 2nd line of attack, it's checkmate: 
    if (secondLine.value) {
        playerCache?.set(board, true);
        return true
    }

    const attacker = otherPlayer(defender);

    //Now look for a way out of check that would block the line of attack by
    //moving another defending piece in between.

    //Examine each square from the king to the attacking/checking piece, 
    //and see if that square is under 'attack' by a defender's piece,
    //and if so, be sure moving it there would fully remove the player from check,
    //important because the blocking piece may have been pinned.

    for(let squareOnCheckLine of (checkLine.value)){
        const blockingSquare = square(squareOnCheckLine) as Square;
        const movesToBlockingSquare = generateLinesOfAttack(board, defender, blockingSquare);

        //find any defensive moves onto this particular intervening grid-square,
        //this could either capture the checking piece or block it:
        let blockingMoveInfo = movesToBlockingSquare.next();

        while(!blockingMoveInfo.done){
            //This will be a line of grid-coordinates, starting
            //one step away from the square on the check-line and 
            //ending at a defender's piece...:
            const blockingMove: Array<GridCoordinates> = blockingMoveInfo.value;
            //...so to get the moved piece's square, get the last coordinates from the 'line-of-attck'
            const defendingPieceMovesFrom = square(blockingMove[blockingMove.length -1]);

            
            if (defendingPieceMovesFrom 
                && playerAt(board, defendingPieceMovesFrom) === defender
                && !movesIntoCheck(board, defendingPieceMovesFrom, blockingSquare)
            ) {
                playerCache?.set(board, false);
                return false;
            }
            
            blockingMoveInfo = movesToBlockingSquare.next();
        }
    }
    //No blocking move = checkmate.
    playerCache?.set(board, true);
    return true;
}

export default isCheckmate;
