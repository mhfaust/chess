import pawnMoves from './pawnMoves';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';
import { PositionName }  from 'logic/positions/positionName';

type TestCases = { pawnPosition: PositionName, attackedPositions: PositionName[] }[];

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
        { pawnPosition: 'A2', attackedPositions: ['A3', 'A4'] },
        { pawnPosition: 'B2', attackedPositions: ['B3'] },
        { pawnPosition: 'C3', attackedPositions: ['C4', 'B4'] },
        { pawnPosition: 'D4', attackedPositions: ['C5', 'D5', 'E5'] },
        { pawnPosition: 'E2', attackedPositions: ['E3', 'E4'] },
        { pawnPosition: 'F2', attackedPositions: ['F3', 'F4'] },
        { pawnPosition: 'G2', attackedPositions: ['G3', 'G4'] },
        { pawnPosition: 'H4', attackedPositions: ['G5'] },
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
        { pawnPosition: 'A7', attackedPositions: ['A6', 'A5'] },
        { pawnPosition: 'B4', attackedPositions: ['B3', 'C3'] },
        { pawnPosition: 'C5', attackedPositions: ['C4', 'D4'] },
        { pawnPosition: 'D6', attackedPositions: ['D5'] },
        { pawnPosition: 'E5', attackedPositions: ['D4', 'E4'] },
        { pawnPosition: 'F7', attackedPositions: ['F6', 'F5'] },
        { pawnPosition: 'G5', attackedPositions: ['G4', 'H4'] },
        { pawnPosition: 'H5', attackedPositions: [] },
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

        const foundMoves = pawnMoves(board, 'D4', 'E3');
        expect(foundMoves).toContain('E3');
    });

    it('black pawn cannot attack a passant-looking square if passant info is null', () => {

        const foundMoves = pawnMoves(board, 'D4', null);
        expect(foundMoves).not.toContain('E3');
    });

    it('white pawn can attack a square passed by a black pawn moving from rank 2 to 4', () => {

        const foundMoves = pawnMoves(board, 'H5', 'G6');
        expect(foundMoves).toContain('G6');
    });

    it('white pawn cannot attack a passant-looking square if passant info is null', () => {

        const foundMoves = pawnMoves(board, 'H5', null);
        expect(foundMoves).not.toContain('G6');
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
            'G3',
        ])
    
        const foundLegalMoves = pawnMoves(board, 'F2', null);

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

        const foundLegalMoves = pawnMoves(board, 'F2', null);

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });
})