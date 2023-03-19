import { square }  from 'logic/squares';
import { BLACK_PIECES, WHITE_PIECES }  from 'logic/constants/pieces';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Piece }  from 'logic/squares/piece';
import { Square }  from 'logic/squares/square';

export type PieceSquare = {
    position: Square;
    piece: Piece;
}
function allPlayerSquares(board: Board, player: Player): Array<PieceSquare>{
    
    const occupiedSquares: Array<PieceSquare> = [];
    const allPlayerPieces = player === 'Black' ? BLACK_PIECES : WHITE_PIECES;

    board.forEach((file, i) => file.forEach((piece, j) => {
        if(piece && allPlayerPieces.has(piece)){
            occupiedSquares.push({
                position: (square([i, j]) as Square),
                piece
            });
        }
    }));
    return occupiedSquares;
}

export default allPlayerSquares;