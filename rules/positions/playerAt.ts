import { pieceAt }  from 'rules/positions';
import { BLACK_PIECES }  from 'rules/constants/pieces'
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';
import { PositionName } from './positionName';

const playerAt = (board: Board, position: PositionName): Player | null => {
    const piece = pieceAt(board, position);

    if(piece === null){
        return null;
    }
     
    return BLACK_PIECES.has(piece)  ? 'Black' : 'White';
}

export default playerAt;