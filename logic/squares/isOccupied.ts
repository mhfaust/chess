import { pieceAt }  from 'logic/squares';
import { Board }  from 'logic/types/Board';
import { Square } from 'logic/squares/square';

function isOccupied  (
    board: Board, 
    position: Square)
    : boolean {
        return Boolean(pieceAt(board, position));
    }
    
export default isOccupied;