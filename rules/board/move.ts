import { file, rank, pieceAt }  from 'rules/positions';
import { Board }  from 'rules/types/Board';
import { PositionName }  from 'rules/positions/positionName';

const cache = new Map<Board, Map<string, Board>>();

/** Does not validate the move (to may be occupied, may be in check, etc.) */
function move (
    previousBoard: Board, 
    from: PositionName, 
    to: PositionName
) : Board {

    const boardCache = cache.get(previousBoard) ?? cache.set(previousBoard, new Map()).get(previousBoard);

    const moveHash = from + to;
    if(boardCache.get(moveHash)){
        return boardCache.get(moveHash);
    }

    const newBoard : Board = [
        [...previousBoard[0]],
        [...previousBoard[1]],
        [...previousBoard[2]],
        [...previousBoard[3]],
        [...previousBoard[4]],
        [...previousBoard[5]],
        [...previousBoard[6]],
        [...previousBoard[7]],
    ];

    newBoard[file(from)][rank(from)] = null;
    newBoard[file(to)][rank(to)] = pieceAt(previousBoard, from)
    
    boardCache.set(moveHash, newBoard);
    return newBoard;
}

export default move;