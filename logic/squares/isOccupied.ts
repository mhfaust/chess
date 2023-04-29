import { pieceAt }  from 'logic/squares';
import { Position }  from 'logic/types/Position';
import { Square } from 'logic/squares/square';

function isOccupied  (
    position: Position, 
    square: Square)
    : boolean {
        return Boolean(pieceAt(position, square));
    }
    
export default isOccupied;