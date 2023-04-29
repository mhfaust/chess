import { square }  from 'logic/squares';
import { BLACK_PIECES, WHITE_PIECES }  from 'logic/constants/pieces';
import { Position }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Piece }  from 'logic/squares/piece';
import { Square }  from 'logic/squares/square';

export type PieceSquare = {
    square: Square;
    piece: Piece;
}
function allPlayerSquares(position: Position, player: Player): Array<PieceSquare>{
    
    const occupiedSquares: Array<PieceSquare> = [];
    const allPlayerPieces = player === 'Black' ? BLACK_PIECES : WHITE_PIECES;

    position.forEach((file, i) => file.forEach((piece, j) => {
        if(piece && allPlayerPieces.has(piece)){
            occupiedSquares.push({
                square: (square([i, j]) as Square),
                piece
            });
        }
    }));
    return occupiedSquares;
}

export default allPlayerSquares;