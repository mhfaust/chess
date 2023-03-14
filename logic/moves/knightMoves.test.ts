import knightMoves  from 'logic/moves/knightMoves';
import { initialBoard }  from 'logic/board';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';

describe('knight', () => {

    it('can move from initial board white queen knight to a3 and c3 only', () => {
        
        const legalMoves = knightMoves(initialBoard(), 'b1');
        
        expect(legalMoves).toContain('a3')
        expect(legalMoves).toContain('c3')
        expect(legalMoves.size).toBe(2)
    });

    it('can move from initial board white king knight to a3 and c3 only', () => {
        const legalMoves = knightMoves(initialBoard(), 'g1');
        
        expect(legalMoves).toContain('f3')
        expect(legalMoves).toContain('h3')
        expect(legalMoves.size).toBe(2)
    });

    it('can move from initial board black queen knight to a3 and c3 only', () => {
        const legalMoves = knightMoves(initialBoard(), 'b8');
        
        expect(legalMoves).toContain('a6')
        expect(legalMoves).toContain('c6')
        expect(legalMoves.size).toBe(2)
    });

    it('can move from initial board black king knight to a3 and c3 only', () => {
        const legalMoves = knightMoves(initialBoard(), 'g8');
        
        expect(legalMoves).toContain('f6')
        expect(legalMoves).toContain('h6')
        expect(legalMoves.size).toBe(2)
    });

    it('Can capture only enemy pieces', () => {
        const board: Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,BK],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,__,__,BP,__,WP,__,__],
            /*  D  */ [__,__,BP,__,__,__,BP,__],
            /*  E  */ [WK,__,__,__,BK,__,__,__],
            /*  F  */ [__,__,BP,__,__,__,BP,__],
            /*  G  */ [__,__,__,WP,__,BP,__,__],
            /*  H  */ [__,__,__,__,__,__,__,__],
            ];
        const expectedLegalMoves = new Set([
            'c6',
            'g4'
        ]);

        const foundLegalMoves = knightMoves(board, 'e5');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });

    it('Pinned knight cant move', () => {
        const board: Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,__,__,__,__,WP,__,__],
            /*  D  */ [__,__,__,__,__,__,__,__],
            /*  E  */ [WK,WR,__,__,BN,__,__,BK],
            /*  F  */ [__,__,__,__,__,__,__,__],
            /*  G  */ [__,__,__,WP,__,__,__,__],
            /*  H  */ [__,__,__,__,__,__,__,__],
            ];

        const expectedLegalMoves = new Set([]);
    
        const foundLegalMoves = knightMoves(board, 'e5');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });
})