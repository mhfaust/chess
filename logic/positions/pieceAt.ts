import { Board, PieceOrEmpty }  from 'logic/types/Board';
import { Square } from 'logic/positions/square';
import COORDS from 'logic/positions/coordinates';

function pieceAt (board: Board, position?: Square): PieceOrEmpty {
    if (!position) {
        return null;
    }
    const [file, rank] = COORDS[position]
    return board[file][rank] ?? null;
}

export default pieceAt;