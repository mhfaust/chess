import { 
    generateLinesOfAttack, 
    movesIntoCheck } from 'rules/check';

import { 
    displaceTo, 
    otherPlayer, 
    playerAt, 
    isOnBoard, 
    positionName
} from 'rules/positions';
    
import { kingVectors }  from 'rules/constants/move-vectors';
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';
import kingPosition  from 'rules/positions/kingPosition';
import { PositionName } from 'rules/positions/positionName';
import { GridCoordinates } from 'rules/types/GridCoordinates';
import { MoveVector } from 'rules/types/MoveVector';

const cache = new Map<Player, Map<Board, boolean>>()
    .set("Black", new Map())
    .set("White", new Map());

function isCheckmate(
    board: Board, 
    defender: Player
): boolean {

    const playerCache = cache.get(defender);
    const cached = playerCache?.get(board);
    if(cached){
        return cached;
    }

    const kingPos = kingPosition(board, defender);

    //is there any way to get out of check by moving the king?
    for(let i = 0; i < kingVectors.length; i++){
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
    if(checkLine.value === null){
        //Not checkmate if they're not in check!
        playerCache?.set(board, false);
        return false;
    }
    
    //There's no way to remove check from 2 pieces w/o moving the king,
    //which we just looked for, above.
    const secondLine = attackLines.next();
    //So if there's a 2nd line of attack, it's checkmate: 
    if(secondLine.value){
        playerCache?.set(board, true);
        return true
    }

    const attacker = otherPlayer(defender);

    //Now look for a way out of check that would block the line of attack by
    //moving another defending piece in between.

    //Examine each square from the king to the attacking/checking piece, 
    //and see if that square is under "attack" by a defender's piece,
    //and if so, be sure moving it there would fully remove the player from check,
    //important because the blocking piece may have been pinned.

    for(let positionOnCheckLine of (checkLine.value)){
        const posName = positionName(positionOnCheckLine) as PositionName;
        const defensiveMoves = generateLinesOfAttack(board, attacker, posName);
        //find any defensive moves onto this particular intervening grid-square,
        //this could either capture the checking piece or block it:
        let defensiveMoveInfo = defensiveMoves.next();
        while(!defensiveMoveInfo.done){
            //This will be a line of grid-coordinates, starting
            //one step away from the position on the check-line and 
            //ending at a defender's piece...:
            const defensiveMove: Array<GridCoordinates> = defensiveMoveInfo.value;
            //...so to get the moved piece's position, get the last coordinates from the "line-of-attck"
            const defendingPieceMovesFrom = positionName(defensiveMove[defensiveMove.length -1]);
            
            if(defendingPieceMovesFrom 
                && !movesIntoCheck(board, defendingPieceMovesFrom, posName)
            ){
                playerCache?.set(board, false);
                return false;
            }
            
            defensiveMoveInfo = defensiveMoves.next();
        }
    }
    //No blocking move = checkmate.
    playerCache?.set(board, true);
    return true;
}

export default isCheckmate;
