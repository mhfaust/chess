import { pieceAt }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { PositionName } from 'logic/positions/positionName';

function isOccupied  (
    board: Board, 
    position: PositionName)
    : boolean {
        return Boolean(pieceAt(board, position));
    }
    
export default isOccupied;