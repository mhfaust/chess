import { rank, file, playerAt, pieceAt }  from 'rules/positions';
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';
import areEmpty from 'rules/moves/areEmpty';
import { isInCheck } from 'rules/check';


function kingCanMove (
    board: Board, 
    from: PositionName, 
    to: PositionName, 
    castlingPreclusions: CastlingPreclusions
) {

    const player = playerAt(board, from);
   
    //normal move 
    if(Math.abs(rank(to) - rank(from)) < 2
        && Math.abs(file(to) - file(from)) < 2
        && player !== playerAt(board, to)
        && !movesIntoCheck(board, from, to)
    ){
        return true;
    }

    //Can't castle out of check, so if they're in check & don't look for castling moves:
    if(player && isInCheck(board, player)){
        return false;
    }

    if(from === 'E1' && player === 'White'){
        if(to === 'G1'){
            return !castlingPreclusions.has('H1') 
                && areEmpty(board, 'F1', 'G1')
                && !movesIntoCheck(board, 'E1', 'F1')//across check
                && !movesIntoCheck(board, 'E1', 'G1')//into check
        }
        if(to === 'C1'){
            return !castlingPreclusions.has('A1') 
            && areEmpty(board, 'B1', 'C1', 'D1')
                && !movesIntoCheck(board, 'E1', 'D1')//across check
                && !movesIntoCheck(board, 'E1', 'C1')//into check
        }
        return false;
    }
    if(from === 'E8' && player === 'Black'){
        if(to === 'G8'){
            return !castlingPreclusions.has('H8') 
                && areEmpty(board, 'F8', 'G8')
                && !movesIntoCheck(board, 'E8', 'F8')//across check
                && !movesIntoCheck(board, 'E8', 'G8')//into check
        }
        if(to === 'C8'){
            return !castlingPreclusions.has('A8') 
                && areEmpty(board, 'B8', 'C8', 'D8')
                && !movesIntoCheck(board, 'E8', 'D8')//across check
                && !movesIntoCheck(board, 'E8', 'C8')//into check
        }
        return false;        
    }

    return false;
}

export default kingCanMove;