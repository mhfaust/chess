import { 
    playerAt, 
    displaceFrom, 
    otherPlayer, 
    pieceAt, 
} from 'rules/positions';
import { 
    knightVectors, 
    pawnBlackAttackVectors, 
    pawnWhiteAttackVectors, 
    queenVectors
} from 'rules/constants/move-vectors'

import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';

import { Piece }  from 'rules/positions/piece';
import COORDS  from 'rules/positions/coordinates';
import { GridCoordinates } from 'rules/types/GridCoordinates';
import { MoveVector } from 'rules/types/MoveVector';
import { canMoveTo } from 'rules/moves';

export type AttackPattern = {
    vectors: ReadonlyArray<MoveVector>; 
    limit: number;
}

const whiteAttackPatterns: Array<AttackPattern> = [
    { vectors: pawnWhiteAttackVectors, limit: 1 },
    { vectors: knightVectors, limit: 1 },
    { vectors: queenVectors, limit: 0 },
];

const blackAttackPatterns: Array<AttackPattern> = [
    { vectors: pawnBlackAttackVectors, limit: 1 },
    { vectors: knightVectors, limit: 1 },
    { vectors: queenVectors, limit: 0 },
];

const isPawn = (p: Piece) => ['Black Pawn', 'White Pawn'].includes(p)

function * generateLinesOfAttack(
    board: Board, 
    defender: Player, 
    target: PositionName)
    : IterableIterator<GridCoordinates[]>
{
    if(!target){
        return;
    }
    const attacker = otherPlayer(defender);
    let attackPatterns = attacker === 'Black' ? blackAttackPatterns : whiteAttackPatterns;

    const attackLines = new Map<PositionName, GridCoordinates[]>();

    for(let attackPattern of attackPatterns){
        const { vectors, limit, } = attackPattern;

        for(let vector of vectors){   
            const attackLine: GridCoordinates[] = [];
            let examinedPosition = displaceFrom(target, vector);
            let step = 0;
            while (examinedPosition && ++step) {
                attackLine.push(COORDS[examinedPosition]);
                const pieceThere = pieceAt(board, examinedPosition);
                
                if (pieceThere) {
                    
                    if (playerAt(board, examinedPosition) === attacker
                        && !attackLines.has(examinedPosition)
                        && canMoveTo(board, examinedPosition, target)
                    ){
                        yield attackLine; 
                        attackLines.set(examinedPosition, attackLine);
                    }
                    break; //found a piece, done with vector
                }
                else if (limit && step === limit) {
                    break; //attack patten only goes one or two out (knight, pawn, or king). done with vector.
                }

                examinedPosition = displaceFrom(examinedPosition, vector);
            }
        }
    }
    return null;
}

export default generateLinesOfAttack;