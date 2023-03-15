import { rank, file, playerAt, pieceAt }  from 'logic/positions';
import movesIntoCheck  from 'logic/check/movesIntoCheck';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/positions/square';
import areEmpty from 'logic/moves/areEmpty';
import { isInCheck } from 'logic/check';


function kingCanMove (
    board: Board, 
    from: Square, 
    to: Square, 
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

    if(from === 'e1' && player === 'White'){
        if(to === 'g1'){
            return !castlingPreclusions.has('h1') 
                && areEmpty(board, 'f1', 'g1')
                && !movesIntoCheck(board, 'e1', 'f1')//across check
                && !movesIntoCheck(board, 'e1', 'g1')//into check
        }
        if(to === 'c1'){
            return !castlingPreclusions.has('a1') 
            && areEmpty(board, 'b1', 'c1', 'd1')
                && !movesIntoCheck(board, 'e1', 'd1')//across check
                && !movesIntoCheck(board, 'e1', 'c1')//into check
        }
        return false;
    }
    if(from === 'e8' && player === 'Black'){
        if(to === 'g8'){
            return !castlingPreclusions.has('h8') 
                && areEmpty(board, 'f8', 'g8')
                && !movesIntoCheck(board, 'e8', 'f8')//across check
                && !movesIntoCheck(board, 'e8', 'g8')//into check
        }
        if(to === 'c8'){
            return !castlingPreclusions.has('a8') 
                && areEmpty(board, 'b8', 'c8', 'd8')
                && !movesIntoCheck(board, 'e8', 'd8')//across check
                && !movesIntoCheck(board, 'e8', 'c8')//into check
        }
        return false;        
    }

    return false;
}

export default kingCanMove;