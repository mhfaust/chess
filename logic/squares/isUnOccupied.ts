import { ALL_PIECES }  from 'logic/constants/pieces';
import { pieceAt }  from 'logic/squares';
import { Position }  from 'logic/types/Board';
import { Square } from 'logic/squares/square';

function isUnOccupied (position: Position, square: Square): boolean {
    return !pieceAt(position, square);
}
    

export default isUnOccupied;