import { rank, file, playerAt, pieceAt }  from 'rules/positions';
import movesIntoCheck  from 'rules/check/movesIntoCheck';
import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';


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

    if(from === 'E1' && player === 'White'){
        if(to === 'G1'){
            return !castlingPreclusions.has('H1') 
                && pieceAt(board, 'F1') === null 
                && pieceAt(board, 'G1') === null
                && !movesIntoCheck(board, 'E1', 'F1')//across check
                && !movesIntoCheck(board, 'E1', 'G1')//into check
        }
        if(to === 'C1'){
            return !castlingPreclusions.has('A1') 
                && pieceAt(board, 'B1') === null 
                && pieceAt(board, 'C1') === null
                && pieceAt(board, 'D1') === null
                && !movesIntoCheck(board, 'E1', 'D1')//across check
                && !movesIntoCheck(board, 'E1', 'C1')//into check
        }
        return false;
    }
    if(from === 'E8' && player === 'Black'){
        if(to === 'G8'){
            return !castlingPreclusions.has('H8') 
                && pieceAt(board, 'F8') === null
                && pieceAt(board, 'G8') === null
                && !movesIntoCheck(board, 'E8', 'F8')//across check
                && !movesIntoCheck(board, 'E8', 'G8')//into check
        }
        if(to === 'C8'){
            return !castlingPreclusions.has('A8') 
                && pieceAt(board, 'B8') === null
                && pieceAt(board, 'C8') === null
                && pieceAt(board, 'D8') === null
                && !movesIntoCheck(board, 'E8', 'D8')//across check
                && !movesIntoCheck(board, 'E8', 'C8')//into check
        }
        return false;        
    }

    return false;
}

export default kingCanMove;