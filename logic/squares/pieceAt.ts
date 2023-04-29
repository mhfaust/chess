import { Position, PieceOrEmpty }  from 'logic/types/Board';
import { Square } from 'logic/squares/square';
import COORDS from 'logic/squares/coordinates';

function pieceAt (position: Position, square?: Square): PieceOrEmpty {
    if (!square) {
        return null;
    }
    const [file, rank] = COORDS[square]
    return position[file][rank] ?? null;
}

export default pieceAt;