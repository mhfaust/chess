import allPlayerPositions, { PiecePosition }  from 'logic/positions/allPlayerPositions'
import { initialBoard }  from 'logic/board'
import { PositionName }  from 'logic/positions/positionName';
import { Piece }  from 'logic/positions/piece';

describe('allPlayerPositions finds all white piecesonr initial board', () => {

    const results = allPlayerPositions(initialBoard(), 'White');

    const foundWhitePieceAt = (piece: Piece, position: PositionName) =>{
        return results.some((result: PiecePosition) =>
            result.position === position &&
            result.piece === piece
        );
    }

    it('should find a White rook at A1 ', () => {
        expect(foundWhitePieceAt('White Rook', 'A1')).toBe(true);
    })
    it('should find a White knight at B1 ', () => {
        expect(foundWhitePieceAt('White Knight', 'B1')).toBe(true);
    })
    it('should find a White bishop at C1 ', () => {
        expect(foundWhitePieceAt('White Bishop', 'C1')).toBe(true);
    })
    it('should find a White queen at D1 ', () => {
        expect(foundWhitePieceAt('White Queen', 'D1')).toBe(true);
    })
    it('should find a White king at E1 ', () => {
        expect(foundWhitePieceAt('White King', 'E1')).toBe(true);
    });
    it('should find a White bishop at F1 ', () => {
        expect(foundWhitePieceAt('White Bishop', 'F1')).toBe(true);
    });
    it('should find a White knight at G1 ', () => {
        expect(foundWhitePieceAt('White Knight', 'G1')).toBe(true);
    });
    it('should find a White rook at H1 ', () => {
        expect(foundWhitePieceAt('White Rook', 'H1')).toBe(true);
    });
    it('should find a White pawn at A2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'A2')).toBe(true);
    });
    it('should find a White pawn at B2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'B2')).toBe(true);
    });
    it('should find a White pawn at C2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'C2')).toBe(true);
    });
    it('should find a White pawn at D2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'D2')).toBe(true);
    });
    it('should find a White pawn at E2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'E2')).toBe(true);
    });
    it('should find a White pawn at F2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'F2')).toBe(true);
    });
    it('should find a White pawn at G2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'G2')).toBe(true);
    });
    it('should find a White pawn at H2 ', () => {
        expect(foundWhitePieceAt('White Pawn', 'H2')).toBe(true);
    });
});

describe('allPlayerPositions finds all white piecesonr initial board', () => {

    const results = allPlayerPositions(initialBoard(), 'Black');

    const foundBlackPieceAt = (piece: Piece, position: PositionName) =>{
        return results.some((result: PiecePosition) =>
            result.position === position &&
            result.piece === piece
        );
    }
    it('should find a Black rook at A8 ', () => {
        expect(foundBlackPieceAt('Black Rook', 'A8')).toBe(true);
    })
    it('should find a Black knight at B8 ', () => {
        expect(foundBlackPieceAt('Black Knight', 'B8')).toBe(true);
    })
    it('should find a Black bishop at C8 ', () => {
        expect(foundBlackPieceAt('Black Bishop', 'C8')).toBe(true);
    })
    it('should find a Black queen at D8 ', () => {
        expect(foundBlackPieceAt('Black Queen', 'D8')).toBe(true);
    })
    it('should find a Black king at E8 ', () => {
        expect(foundBlackPieceAt('Black King', 'E8')).toBe(true);
    });
    it('should find a Black bishop at F8 ', () => {
        expect(foundBlackPieceAt('Black Bishop', 'F8')).toBe(true);
    });
    it('should find a Black knight at G8 ', () => {
        expect(foundBlackPieceAt('Black Knight', 'G8')).toBe(true);
    });
    it('should find a Black rook at H8 ', () => {
        expect(foundBlackPieceAt('Black Rook', 'H8')).toBe(true);
    });
    it('should find a Black pawn at A7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'A7')).toBe(true);
    });
    it('should find a Black pawn at B7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'B7')).toBe(true);
    });
    it('should find a Black pawn at C7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'C7')).toBe(true);
    });
    it('should find a Black pawn at D7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'D7')).toBe(true);
    });
    it('should find a Black pawn at E7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'E7')).toBe(true);
    });
    it('should find a Black pawn at F7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'F7')).toBe(true);
    });
    it('should find a Black pawn at G7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'G7')).toBe(true);
    });
    it('should find a Black pawn at H7 ', () => {
        expect(foundBlackPieceAt('Black Pawn', 'H7')).toBe(true);
    });
});