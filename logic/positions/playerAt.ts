import { pieceAt }  from 'logic/positions';
import { BLACK_PIECES }  from 'logic/constants/pieces'
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { PositionName } from 'logic/positions/positionName';

const playerAt = (board: Board, position: PositionName): Player | null => {
    const piece = pieceAt(board, position);

    if(piece === null){
        return null;
    }
     
    return BLACK_PIECES.has(piece)  ? 'Black' : 'White';
}

export default playerAt;