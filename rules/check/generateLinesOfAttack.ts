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
    kingVectors,
    bishopVectors,
    rookVectors
} from 'rules/constants/move-vectors'

import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';

import { Piece }  from 'rules/positions/piece';
import COORDS  from 'rules/positions/coordinates';
import { GridCoordinates } from 'rules/types/GridCoordinates';
import { MoveVector } from 'rules/types/MoveVector';
import { canMoveTo } from 'rules/moves';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'rules/positions/pieces-shorthand';
import isPawn from 'rules/pieces/isPawn';


export type AttackPattern = {
    vectors: ReadonlyArray<MoveVector>; 
    canAttackLikeThis: Set<Piece>; 
    limit: number;
}

const whiteAttackPatterns: Array<AttackPattern> = [
    { vectors: pawnWhiteAttackVectors, canAttackLikeThis: new Set([WP, WQ, WB, WK]), limit: 1 },
    { vectors: kingVectors, canAttackLikeThis: new Set([WK, WQ]), limit: 1 },
    { vectors: knightVectors, canAttackLikeThis: new Set([WN]), limit: 1 },
    { vectors: bishopVectors, canAttackLikeThis: new Set([WB, WQ]), limit: 0 },
    { vectors: rookVectors, canAttackLikeThis: new Set([WR, WQ]), limit: 0 },
];

const blackAttackPatterns: Array<AttackPattern> = [
    { vectors: pawnBlackAttackVectors, canAttackLikeThis: new Set([BP, BQ, BB, BK]), limit: 1 },
    { vectors: kingVectors, canAttackLikeThis: new Set([BK, BQ]), limit: 1 },
    { vectors: knightVectors, canAttackLikeThis: new Set([BN]), limit: 1 },
    { vectors: bishopVectors, canAttackLikeThis: new Set([BB, BQ]), limit: 0 },
    { vectors: rookVectors, canAttackLikeThis: new Set([BR, BQ]), limit: 0 },
];

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
        const { vectors, limit, canAttackLikeThis} = attackPattern;

        for(let vector of vectors){   
            const attackLine: GridCoordinates[] = [];
            let examinedPosition = displaceFrom(target, vector);
            let step = 0;
            while (examinedPosition && ++step) {
                attackLine.push(COORDS[examinedPosition]);
                const pieceThere = pieceAt(board, examinedPosition);
                
                if (pieceThere) {
                    
                    if (playerAt(board, examinedPosition) === attacker
                        && canAttackLikeThis.has(pieceThere) 
                        && !attackLines.has(examinedPosition)
                        && (!isPawn(pieceThere) || canMoveTo(board, examinedPosition, target))
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