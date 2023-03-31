import { pieceAt }  from 'logic/squares';
import { Board }  from 'logic/types/Board';
import { Square } from 'logic/squares/square';

function isOccupied  (
    board: Board, 
    square: Square)
    : boolean {
        return Boolean(pieceAt(board, square));
    }
    
export default isOccupied;