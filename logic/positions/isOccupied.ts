import { pieceAt }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { Square } from 'logic/positions/positionName';

function isOccupied  (
    board: Board, 
    position: Square)
    : boolean {
        return Boolean(pieceAt(board, position));
    }
    
export default isOccupied;