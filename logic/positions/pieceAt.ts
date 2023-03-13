import { Board, PieceOrEmpty }  from 'logic/types/Board';
import { PositionName } from 'logic/positions/positionName';
import COORDS from 'logic/positions/coordinates';

function pieceAt (board: Board, position?: PositionName): PieceOrEmpty {
    if (!position) {
        return null;
    }
    const [file, rank] = COORDS[position]
    return board[file][rank] ?? null;
}

export default pieceAt;