import { ALL_PIECES }  from 'logic/constants/pieces';
import { pieceAt }  from 'logic/squares';
import { Board }  from 'logic/types/Board';
import { Square } from 'logic/squares/square';

function isUnOccupied (board: Board, square: Square): boolean {
    return !pieceAt(board, square);
}
    

export default isUnOccupied;