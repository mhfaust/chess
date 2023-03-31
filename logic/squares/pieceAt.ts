import { Board, PieceOrEmpty }  from 'logic/types/Board';
import { Square } from 'logic/squares/square';
import COORDS from 'logic/squares/coordinates';

function pieceAt (board: Board, square?: Square): PieceOrEmpty {
    if (!square) {
        return null;
    }
    const [file, rank] = COORDS[square]
    return board[file][rank] ?? null;
}

export default pieceAt;