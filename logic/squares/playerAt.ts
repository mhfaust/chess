import { pieceAt }  from 'logic/squares';
import { BLACK_PIECES }  from 'logic/constants/pieces'
import { Position }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/squares/square';

const playerAt = (position: Position, square: Square): Player | null => {
    const piece = pieceAt(position, square);

    if(piece === null){
        return null;
    }
     
    return BLACK_PIECES.has(piece)  ? 'Black' : 'White';
}

export default playerAt;