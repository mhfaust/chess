import { pieceAt }  from 'logic/squares';
import { BLACK_PIECES }  from 'logic/constants/pieces'
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/squares/square';

const playerAt = (board: Board, position: Square): Player | null => {
    const piece = pieceAt(board, position);

    if(piece === null){
        return null;
    }
     
    return BLACK_PIECES.has(piece)  ? 'Black' : 'White';
}

export default playerAt;