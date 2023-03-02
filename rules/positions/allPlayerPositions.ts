import { positionName }  from 'rules/positions';
import { BLACK_PIECES, WHITE_PIECES }  from 'rules/constants/pieces';
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';
import { Piece }  from 'rules/positions/piece';
import { PositionName }  from 'rules/positions/positionName';

export type PiecePosition = {
    position: PositionName;
    piece: Piece;
}
function allPlayerPositions(board: Board, player: Player): Array<PiecePosition>{
    
    const occupiedPositions: Array<PiecePosition> = [];
    const allPlayerPieces = player === 'Black' ? BLACK_PIECES : WHITE_PIECES;

    board.forEach((file, i) => file.forEach((piece, j) => {
        if(piece && allPlayerPieces.has(piece)){
            occupiedPositions.push({
                position: (positionName([i, j]) as PositionName),
                piece
            });
        }
    }));
    return occupiedPositions;
}

export default allPlayerPositions;