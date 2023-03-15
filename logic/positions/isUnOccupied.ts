import { ALL_PIECES }  from 'logic/constants/pieces';
import { pieceAt }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { Square } from 'logic/positions/square';

function isUnOccupied (board: Board, position: Square): boolean {
    return !pieceAt(board, position);
}
    

export default isUnOccupied;