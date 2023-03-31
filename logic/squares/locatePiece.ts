import { pieceAt }  from 'logic/squares'
import { Board }  from 'logic/types/Board';
import square, { Square } from 'logic/squares/square';

export type UniquePiece = 
    | 'White King' 
    | 'White Queen' 
    | 'Black King' 
    | 'Black Queen' 

/**
 * 
 * @param board 
 * @param piece 
 * @returns 
 */
function locatePiece(board: Board, piece: UniquePiece) : Square | null {
    for(let file = 0; file < 8; file++){
        for (let rank = 0; rank < 8; rank++){
            const coords: ReadonlyArray<number> = [file, rank];
            if(board[file][rank] === piece){
                return square(coords);
            }
        }
    }
    return null;
}

export default locatePiece;