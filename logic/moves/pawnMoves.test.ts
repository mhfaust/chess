import pawnMoves from './pawnMoves';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';
import { Square }  from 'logic/positions/positionName';

type TestCases = { pawnPosition: Square, attackedPositions: Square[] }[];

const pawn1Board: Board = [
    /*         1  2  3  4  5  6  7  8  */
    /*  A  */ [WR,WP,__,__,__,__,BP,BR],
    /*  B  */ [WN,WP,__,BP,__,__,__,BN],
    /*  C  */ [WB,__,WP,__,BP,__,__,BB],
    /*  D  */ [WQ,__,__,WP,__,BP,__,BQ],
    /*  E  */ [WK,WP,__,__,BP,__,__,BK],
    /*  F  */ [WB,WP,__,__,__,__,BP,BB],
    /*  G  */ [WN,WP,__,__,BP,__,__,BN],
    /*  H  */ [WR,__,__,WP,BP,__,__,BR],
    ];

describe('white pawn', () => {

    const testCases: TestCases = [
        { pawnPosition: 'a2', attackedPositions: ['a3', 'a4'] },
        { pawnPosition: 'b2', attackedPositions: ['b3'] },
        { pawnPosition: 'c3', attackedPositions: ['c4', 'b4'] },
        { pawnPosition: 'd4', attackedPositions: ['c5', 'd5', 'e5'] },
        { pawnPosition: 'e2', attackedPositions: ['e3', 'e4'] },
        { pawnPosition: 'f2', attackedPositions: ['f3', 'f4'] },
        { pawnPosition: 'g2', attackedPositions: ['g3', 'g4'] },
        { pawnPosition: 'h4', attackedPositions: ['g5'] },
    ] ;

    testCases.forEach((testCase) => {
        it(`provides all possible moves from pawn at ${(testCase.pawnPosition)} on pawn1board: `, () => {

            const board =  pawn1Board;
            const foundMoves = pawnMoves(board, testCase.pawnPosition, null);
    
            expect(foundMoves).toEqual(new Set(testCase.attackedPositions));
        })
    });

});
    
describe('black pawn', () => {

    const testCases: TestCases = [
        { pawnPosition: 'a7', attackedPositions: ['a6', 'a5'] },
        { pawnPosition: 'b4', attackedPositions: ['b3', 'c3'] },
        { pawnPosition: 'c5', attackedPositions: ['c4', 'd4'] },
        { pawnPosition: 'd6', attackedPositions: ['d5'] },
        { pawnPosition: 'e5', attackedPositions: ['d4', 'e4'] },
        { pawnPosition: 'f7', attackedPositions: ['f6', 'f5'] },
        { pawnPosition: 'g5', attackedPositions: ['g4', 'h4'] },
        { pawnPosition: 'h5', attackedPositions: [] },
    ] ;

    testCases.forEach((testCase) => {
        it(`provides all possible moves from pawn at ${(testCase.pawnPosition)} on pawn1board: `, () => {

            const board =  pawn1Board;
            const foundMoves = pawnMoves(board, testCase.pawnPosition, null);
    
            expect(foundMoves).toEqual(new Set(testCase.attackedPositions));
        })
    });

});

describe('en passant', () => {
    const board : Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,WP,__,__,__,__,BP,BR],
        /*  B  */ [WN,WP,__,__,__,__,BP,BN],
        /*  C  */ [WB,WP,__,__,__,__,BP,BB],
        /*  D  */ [WQ,WP,__,BP,__,__,__,BQ],
        /*  E  */ [WK,__,__,WP,__,__,BP,BK],
        /*  F  */ [WB,WP,__,__,__,__,BP,BB],
        /*  G  */ [WN,WP,__,__,BP,__,__,BN],
        /*  H  */ [WR,__,__,__,WP,__,BP,BR],
    ];

    it('black pawn can attack a square passed by a white pawn moving from rank 2 to 4', () => {

        const foundMoves = pawnMoves(board, 'd4', 'e3');
        expect(foundMoves).toContain('e3');
    });

    it('black pawn cannot attack a passant-looking square if passant info is null', () => {

        const foundMoves = pawnMoves(board, 'd4', null);
        expect(foundMoves).not.toContain('e3');
    });

    it('white pawn can attack a square passed by a black pawn moving from rank 2 to 4', () => {

        const foundMoves = pawnMoves(board, 'h5', 'g6');
        expect(foundMoves).toContain('g6');
    });

    it('white pawn cannot attack a passant-looking square if passant info is null', () => {

        const foundMoves = pawnMoves(board, 'h5', null);
        expect(foundMoves).not.toContain('g6');
    });
});

describe('check', () => {
    it('Only move is capture', () => {
        const board: Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,__,__,__,__,__,__,__],
            /*  D  */ [__,__,__,__,__,__,__,__],
            /*  E  */ [WK,__,__,__,__,__,__,BK],
            /*  F  */ [__,WP,__,__,__,__,__,__],
            /*  G  */ [__,__,BB,__,__,__,__,__],
            /*  H  */ [__,__,__,__,__,__,__,__],
        ];
        const expectedLegalMoves = new Set([
            'g3',
        ])
    
        const foundLegalMoves = pawnMoves(board, 'f2', null);

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });

    it('Pinned pawn cant move', () => {
        const board: Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,__,__,__,__,__,__,__],
            /*  D  */ [__,__,__,__,__,__,__,__],
            /*  E  */ [WK,__,BP,__,__,__,__,BK],
            /*  F  */ [__,WP,__,__,__,__,__,__],
            /*  G  */ [__,__,__,__,__,__,__,__],
            /*  H  */ [__,__,__,BQ,__,__,__,__],
        ];
        const expectedLegalMoves = new Set([])

        const foundLegalMoves = pawnMoves(board, 'f2', null);

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });
})