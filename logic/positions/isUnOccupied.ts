import { ALL_PIECES }  from 'rules/constants/pieces';
import { pieceAt }  from 'rules/positions';
import { Board }  from 'rules/types/Board';
import { PositionName } from 'rules/positions/positionName';

function isUnOccupied (board: Board, position: PositionName): boolean {
    return !pieceAt(board, position);
}
    

export default isUnOccupied;