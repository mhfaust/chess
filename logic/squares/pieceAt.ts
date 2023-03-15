import { Board, PieceOrEmpty }  from 'logic/types/Board';
import { Square } from 'logic/squares/square';
import COORDS from 'logic/squares/coordinates';

function pieceAt (board: Board, position?: Square): PieceOrEmpty {
    if (!position) {
        return null;
    }
    const [file, rank] = COORDS[position]
    return board[file][rank] ?? null;
}

export default pieceAt;