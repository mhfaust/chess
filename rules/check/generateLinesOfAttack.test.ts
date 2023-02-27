import generateLinesOfAttack from './generateLinesOfAttack';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ } from 'rules/positions/pieces-shorthand';
import { Board }  from 'rules/types/Board';
import COORDS  from 'rules/positions/coordinates';

describe('generateLinesOfAttack', () => {
    it('finds the line from a bishop at C3 to E5', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,BB,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,WP,__,__,__],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];
        const linesOfAttack = generateLinesOfAttack(board, 'White', 'E5');
        expect(linesOfAttack.next().value).toEqual([COORDS.D4, COORDS.C3]);
        expect(linesOfAttack.next().done).toBe(true);       
    });

    it('does not produce a line from a that is not orthoganally aligned with defender', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,BR,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,WP,__,__,__],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__]
        ];
        const linesOfAttack = generateLinesOfAttack(board, 'White', 'E5')
        const returned = linesOfAttack.next();
        expect(returned.value).toBeNull();       
        expect(returned.done).toBe(true);       
    });

    it('does not produce a line from a knight 2 steps away', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,BN,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,WP,__,__,__],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [BN,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        const linesOfAttack = generateLinesOfAttack(board, 'White', 'E5')
        const returned = linesOfAttack.next();
        expect(returned.value).toBeNull();       
        expect(returned.done).toBe(true);       
    });

    it('Sees a king attack', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,BK,__,__,__],
/*  E  */ [__,__,__,__,WP,__,__,__],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];
        const linesOfAttack = generateLinesOfAttack(board, 'White', 'E5')
        expect(linesOfAttack.next().value).toEqual([COORDS.D5]) ;       
        expect(linesOfAttack.next().done).toBe(true); 
    });

    it('finds several lines of attack', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,WR,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,WB,__,__,__],
/*  E  */ [__,WP,__,__,__,__,__,__],
/*  F  */ [__,WK,BB,__,__,__,WQ,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,WN,__,__,__,__], 
        ];
        const linesOfAttack = generateLinesOfAttack(board, 'Black', 'F3')

        //order of seeking attack-patterns: pawn, king, knight, bishop, rook
        expect(linesOfAttack.next().value).toEqual([COORDS.E2])
        expect(linesOfAttack.next().value).toEqual([COORDS.F2])
        expect(linesOfAttack.next().value).toEqual([COORDS.H4])
        expect(linesOfAttack.next().value).toEqual([COORDS.E4, COORDS.D5])
        expect(linesOfAttack.next().value).toEqual([COORDS.F4, COORDS.F5, COORDS.F6, COORDS.F7])
        expect(linesOfAttack.next().value).toEqual([COORDS.E3, COORDS.D3, COORDS.C3, COORDS.B3, COORDS.A3])     
        expect(linesOfAttack.next().done).toBe(true)     
    });    
})