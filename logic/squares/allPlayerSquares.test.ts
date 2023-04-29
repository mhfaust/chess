import allPlayerSquares, { PieceSquare }  from 'logic/squares/allPlayerSquares'
import { initialBoard } from 'logic/board/initialPosition';
import { Square }  from 'logic/squares/square';
import { Piece }  from 'logic/squares/piece';

describe('allPlayerSquares finds all white piecesonr initial board', () => {

    const results = allPlayerSquares(initialBoard, 'White');

    const foundPieceAt = (piece: Piece, square: Square) =>{
        return results.some((result: PieceSquare) =>
            result.square === square &&
            result.piece === piece
        );
    }

    it('should find a White rook at a1 ', () => {
        expect(foundPieceAt('White Rook', 'a1')).toBe(true);
    })
    it('should find a White knight at b1 ', () => {
        expect(foundPieceAt('White Knight', 'b1')).toBe(true);
    })
    it('should find a White bishop at c1 ', () => {
        expect(foundPieceAt('White Bishop', 'c1')).toBe(true);
    })
    it('should find a White queen at d1 ', () => {
        expect(foundPieceAt('White Queen', 'd1')).toBe(true);
    })
    it('should find a White king at e1 ', () => {
        expect(foundPieceAt('White King', 'e1')).toBe(true);
    });
    it('should find a White bishop at f1 ', () => {
        expect(foundPieceAt('White Bishop', 'f1')).toBe(true);
    });
    it('should find a White knight at g1 ', () => {
        expect(foundPieceAt('White Knight', 'g1')).toBe(true);
    });
    it('should find a White rook at h1 ', () => {
        expect(foundPieceAt('White Rook', 'h1')).toBe(true);
    });
    it('should find a White pawn at a2 ', () => {
        expect(foundPieceAt('White Pawn', 'a2')).toBe(true);
    });
    it('should find a White pawn at b2 ', () => {
        expect(foundPieceAt('White Pawn', 'b2')).toBe(true);
    });
    it('should find a White pawn at c2 ', () => {
        expect(foundPieceAt('White Pawn', 'c2')).toBe(true);
    });
    it('should find a White pawn at d2 ', () => {
        expect(foundPieceAt('White Pawn', 'd2')).toBe(true);
    });
    it('should find a White pawn at e2 ', () => {
        expect(foundPieceAt('White Pawn', 'e2')).toBe(true);
    });
    it('should find a White pawn at f2 ', () => {
        expect(foundPieceAt('White Pawn', 'f2')).toBe(true);
    });
    it('should find a White pawn at g2 ', () => {
        expect(foundPieceAt('White Pawn', 'g2')).toBe(true);
    });
    it('should find a White pawn at h2 ', () => {
        expect(foundPieceAt('White Pawn', 'h2')).toBe(true);
    });
});

describe('allPlayerSquares finds all white piecesonr initial board', () => {

    const results = allPlayerSquares(initialBoard, 'Black');

    const foundPieceAt = (piece: Piece, square: Square) =>{
        return results.some((result: PieceSquare) =>
            result.square === square &&
            result.piece === piece
        );
    }
    it('should find a Black rook at a8 ', () => {
        expect(foundPieceAt('Black Rook', 'a8')).toBe(true);
    })
    it('should find a Black knight at b8 ', () => {
        expect(foundPieceAt('Black Knight', 'b8')).toBe(true);
    })
    it('should find a Black bishop at c8 ', () => {
        expect(foundPieceAt('Black Bishop', 'c8')).toBe(true);
    })
    it('should find a Black queen at d8 ', () => {
        expect(foundPieceAt('Black Queen', 'd8')).toBe(true);
    })
    it('should find a Black king at e8 ', () => {
        expect(foundPieceAt('Black King', 'e8')).toBe(true);
    });
    it('should find a Black bishop at f8 ', () => {
        expect(foundPieceAt('Black Bishop', 'f8')).toBe(true);
    });
    it('should find a Black knight at g8 ', () => {
        expect(foundPieceAt('Black Knight', 'g8')).toBe(true);
    });
    it('should find a Black rook at h8 ', () => {
        expect(foundPieceAt('Black Rook', 'h8')).toBe(true);
    });
    it('should find a Black pawn at a7 ', () => {
        expect(foundPieceAt('Black Pawn', 'a7')).toBe(true);
    });
    it('should find a Black pawn at b7 ', () => {
        expect(foundPieceAt('Black Pawn', 'b7')).toBe(true);
    });
    it('should find a Black pawn at c7 ', () => {
        expect(foundPieceAt('Black Pawn', 'c7')).toBe(true);
    });
    it('should find a Black pawn at d7 ', () => {
        expect(foundPieceAt('Black Pawn', 'd7')).toBe(true);
    });
    it('should find a Black pawn at e7 ', () => {
        expect(foundPieceAt('Black Pawn', 'e7')).toBe(true);
    });
    it('should find a Black pawn at f7 ', () => {
        expect(foundPieceAt('Black Pawn', 'f7')).toBe(true);
    });
    it('should find a Black pawn at g7 ', () => {
        expect(foundPieceAt('Black Pawn', 'g7')).toBe(true);
    });
    it('should find a Black pawn at h7 ', () => {
        expect(foundPieceAt('Black Pawn', 'h7')).toBe(true);
    });
});