import allPlayerPositions, { PiecePosition }  from 'logic/positions/allPlayerPositions'
import { initialBoard }  from 'logic/board'
import { Square }  from 'logic/positions/square';
import { Piece }  from 'logic/positions/piece';

describe('allPlayerPositions finds all white piecesonr initial board', () => {

    const results = allPlayerPositions(initialBoard(), 'White');

    const foundWhitePieceAt = (piece: Piece, position: Square) =>{
        return results.some((result: PiecePosition) =>
            result.position === position &&
            result.piece === piece
        );
    }

    it('should find a White rook at a1 ', () => {
        expect(foundWhitePieceAt('White Rook', 'a1')).toBe(true);
    })
    it('should find a White knight at b1 ', () => {
        expect(foundWhitePieceAt('White Knight', 'b1')).toBe(true);
    })
    it('should find a White bishop at c1 ', () => {
        expect(foundWhitePieceAt('White Bishop', 'c1')).toBe(true);
    })
    it('should find a White queen at d1 ', () => {
        expect(foundWhitePieceAt('White Queen', 'd1')).toBe(true);
    })
    it('should find a White king at e1 ', () => {
        expect(foundWhitePieceAt('White King', 'e1')).toBe(true);
    });
    it('should find a White bishop at f1 ', () => {
        expect(foundWhitePieceAt('White Bishop', 'f1')).toBe(true);
    });
    it('should find a White knight at g1 ', () => {
        expect(foundWhitePieceAt('White Knight', 'g1')).toBe(true);
    });
    it('should find a White rook at h1 ', () => {
        expect(foundWhitePieceAt('White Rook', 'h1')).toBe(true);
    });
    it('should find a White pawn at a2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'a2')).toBe(true);
    });
    it('should find a White pawn at b2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'b2')).toBe(true);
    });
    it('should find a White pawn at c2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'c2')).toBe(true);
    });
    it('should find a White pawn at d2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'd2')).toBe(true);
    });
    it('should find a White pawn at e2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'e2')).toBe(true);
    });
    it('should find a White pawn at f2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'f2')).toBe(true);
    });
    it('should find a White pawn at g2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'g2')).toBe(true);
    });
    it('should find a White pawn at h2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'h2')).toBe(true);
    });
});

describe('allPlayerPositions finds all white piecesonr initial board', () => {

    const results = allPlayerPositions(initialBoard(), 'Black');

    const foundBlackPieceAt = (piece: Piece, position: Square) =>{
        return results.some((result: PiecePosition) =>
            result.position === position &&
            result.piece === piece
        );
    }
    it('should find a Black rook at a8 ', () => {
        expect(foundBlackPieceAt('Black Rook', 'a8')).toBe(true);
    })
    it('should find a Black knight at b8 ', () => {
        expect(foundBlackPieceAt('Black Knight', 'b8')).toBe(true);
    })
    it('should find a Black bishop at c8 ', () => {
        expect(foundBlackPieceAt('Black Bishop', 'c8')).toBe(true);
    })
    it('should find a Black queen at d8 ', () => {
        expect(foundBlackPieceAt('Black Queen', 'd8')).toBe(true);
    })
    it('should find a Black king at e8 ', () => {
        expect(foundBlackPieceAt('Black King', 'e8')).toBe(true);
    });
    it('should find a Black bishop at f8 ', () => {
        expect(foundBlackPieceAt('Black Bishop', 'f8')).toBe(true);
    });
    it('should find a Black knight at g8 ', () => {
        expect(foundBlackPieceAt('Black Knight', 'g8')).toBe(true);
    });
    it('should find a Black rook at h8 ', () => {
        expect(foundBlackPieceAt('Black Rook', 'h8')).toBe(true);
    });
    it('should find a Black pawn at a7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'a7')).toBe(true);
    });
    it('should find a Black pawn at b7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'b7')).toBe(true);
    });
    it('should find a Black pawn at c7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'c7')).toBe(true);
    });
    it('should find a Black pawn at d7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'd7')).toBe(true);
    });
    it('should find a Black pawn at e7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'e7')).toBe(true);
    });
    it('should find a Black pawn at f7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'f7')).toBe(true);
    });
    it('should find a Black pawn at g7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'g7')).toBe(true);
    });
    it('should find a Black pawn at h7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'h7')).toBe(true);
    });
});