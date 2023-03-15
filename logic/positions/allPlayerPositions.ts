import { positionName }  from 'logic/positions';
import { BLACK_PIECES, WHITE_PIECES }  from 'logic/constants/pieces';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Piece }  from 'logic/positions/piece';
import { Square }  from 'logic/positions/positionName';

export type PiecePosition = {
    position: Square;
    piece: Piece;
}
function allPlayerPositions(board: Board, player: Player): Array<PiecePosition>{
    
    const occupiedPositions: Array<PiecePosition> = [];
    const allPlayerPieces = player === 'Black' ? BLACK_PIECES : WHITE_PIECES;

    board.forEach((file, i) => file.forEach((piece, j) => {
        if(piece && allPlayerPieces.has(piece)){
            occupiedPositions.push({
                position: (positionName([i, j]) as Square),
                piece
            });
        }
    }));
    return occupiedPositions;
}

export default allPlayerPositions;