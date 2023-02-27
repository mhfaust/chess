import { pieceAt }  from 'rules/positions';
import { Board }  from 'rules/types/Board';
import { PositionName } from 'rules/positions/positionName';

function isOccupied  (
    board: Board, 
    position: PositionName)
    : boolean {
        return Boolean(pieceAt(board, position));
    }
    
export default isOccupied;