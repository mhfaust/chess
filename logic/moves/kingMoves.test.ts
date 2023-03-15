
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { kingMoves }  from 'logic/moves';
import { Board }  from 'logic/types/Board';
import { RookStartSquare } from 'logic/types/CastlingPreclusions';


describe('kingMoves', () => {
    it('Cannot move, initially', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,WP,__,__,__,__,BP,BR],
        /*  B  */ [WN,WP,__,__,__,__,BP,BN],
        /*  C  */ [WB,WP,__,__,__,__,BP,BB],
        /*  D  */ [WQ,WP,__,__,__,__,BP,BQ],
        /*  E  */ [WK,WP,__,__,__,__,BP,BK],
        /*  F  */ [WB,WP,__,__,__,__,BP,BB],
        /*  G  */ [WN,WP,__,__,__,__,BP,BN],
        /*  H  */ [WR,WP,__,__,__,__,BP,BR],
        ];
        const expectedLegalMoves = new Set([]);

        const foundLegalMoves = kingMoves(board, 'e1', new Set());

        expect(foundLegalMoves).toEqual(expectedLegalMoves);
    });

    it('King moves any diection, only one square', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [__,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,__,__,__,BK,__],
        /*  E  */ [WK,__,__,__,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,__,__],
        /*  H  */ [__,__,__,__,__,__,__,__], 
        ];
        const expectedLegalMoves = new Set(['c6','c7','c8','d6','d8','e6','e7','e8']);

        const foundLegalMoves = kingMoves(board, 'd7', new Set<RookStartSquare>(['a1', 'h1', 'a8', 'h8']));

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });

    it('Cannot put self in check', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,__,__,__,__,__,__,BR],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [WQ,WP,__,__,__,__,__,BK],
        /*  E  */ [WK,WP,__,__,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,BR],
        /*  G  */ [WN,__,__,__,__,__,__,__],
        /*  H  */ [WR,__,__,__,__,__,__,BR], 
        ];

        const foundLegalMoves = kingMoves(board, 'e1', new Set());

        expect(foundLegalMoves).toEqual(new Set([]));
    });

    describe('Preclusion', () => {

        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,WP,__,__,__,__,BP,BR],
        /*  B  */ [WN,WP,__,__,__,__,BP,__],
        /*  C  */ [WB,WP,__,__,__,BN,BP,BB],
        /*  D  */ [WQ,WP,WB,__,BP,__,__,BQ],
        /*  E  */ [WK,__,__,WP,BP,__,__,BK],
        /*  F  */ [__,WP,WN,__,__,__,BP,BB],
        /*  G  */ [__,WP,__,__,__,__,BP,BN],
        /*  H  */ [WR,WP,__,__,__,__,BP,BR],
        ]; 

        it('White king can castle if not precluded', () => {
    
            const foundLegalMoves = kingMoves(board, 'e1', new Set());
    
            expect(foundLegalMoves).toContain('g1')
        });  
    
        it('White king cannot castle if precluded', () => {

            const foundLegalMoves = kingMoves(board, 'e1', new Set<RookStartSquare>(['h1']));
    
            expect(foundLegalMoves).not.toContain('g1')
        });  
    })

    
    
    it('White king cannot castle across check', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,__,__,__,__,BK],
        /*  E  */ [WK,__,__,__,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,BR],
        /*  G  */ [__,__,__,__,__,__,__,__],
        /*  H  */ [WR,__,__,__,__,__,__,__], 
        ];
    
        const foundLegalMoves = kingMoves(board, 'e1', new Set<RookStartSquare>(['a8', 'h8']));

        expect(foundLegalMoves).not.toContain('g1')
    });

     
    it('White king cannot castle into check', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,__,__,__,__,BK],
        /*  E  */ [WK,__,__,__,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,__,BR],
        /*  H  */ [WR,__,__,__,__,__,__,__], 
        ];

        const foundLegalMoves = kingMoves(board, 'e1', new Set<RookStartSquare>(['a8', 'h8']));

        expect(foundLegalMoves).not.toContain('g1')
    });

    it('White king cannot castle when a piece is in between', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,__,__,__,__,__,__,BR],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [WQ,__,__,__,__,__,BP,BK],
        /*  E  */ [WK,__,__,__,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,__,__],
        /*  H  */ [WR,__,__,__,__,__,__,BR], 
        ];

        const foundLegalMoves = kingMoves(board, 'e1', new Set());

        expect(foundLegalMoves).not.toContain('c1')
    });

    it('Black king can castle, queen-side', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,__,__,WP,__,__,BP,BR],
        /*  B  */ [WN,WP,__,__,__,__,BP,__],
        /*  C  */ [WB,WP,__,__,__,BN,BP,__],
        /*  D  */ [WQ,WP,WB,__,BP,__,__,__],
        /*  E  */ [__,__,__,WP,BP,__,__,BK],
        /*  F  */ [WR,WP,WN,__,__,BQ,BP,BB],
        /*  G  */ [WK,WP,__,BB,__,__,BP,BN],
        /*  H  */ [__,WP,__,__,__,__,BP,BR],
        ]; 

        const foundLegalMoves = kingMoves(board, 'e8', new Set());

        expect(foundLegalMoves).toContain('c8')
    });  

    it('White king cannot castle out of check', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,WP,__,__,__,__,BP,BR],
        /*  B  */ [WN,__,__,WP,__,__,BP,BN],
        /*  C  */ [__,WP,__,WB,__,__,BP,BB],
        /*  D  */ [WQ,__,__,BP,__,__,BP,__],
        /*  E  */ [WK,__,__,__,__,__,BQ,BK],
        /*  F  */ [__,WP,BP,__,__,__,__,BB],
        /*  G  */ [__,WP,__,__,__,__,BP,BN],
        /*  H  */ [WR,WP,__,__,__,WB,BP,BR],
        ]; 

        const foundLegalMoves = kingMoves(board, 'e1', new Set());

        expect(foundLegalMoves.has('g1')).toBe(false)
    });  
})