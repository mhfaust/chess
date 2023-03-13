import { Board, PieceOrEmpty }  from 'rules/types/Board';
import { PositionName } from 'rules/positions/positionName';
import COORDS from 'rules/positions/coordinates';

function pieceAt (board: Board, position?: PositionName): PieceOrEmpty {
    if (!position) {
        return null;
    }
    const [file, rank] = COORDS[position]
    return board[file][rank] ?? null;
}

export default pieceAt;