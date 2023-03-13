import { ALL_PIECES }  from 'logic/constants/pieces';
import { pieceAt }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { PositionName } from 'logic/positions/positionName';

function isUnOccupied (board: Board, position: PositionName): boolean {
    return !pieceAt(board, position);
}
    

export default isUnOccupied;