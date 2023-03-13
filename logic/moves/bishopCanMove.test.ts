import bishopCanMove  from 'logic/moves/bishopCanMove'
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';
    
describe('bishopCanMove', () => {

    const bishop1Board : Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [__,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,WP,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,WB,__,__,__,__],
        /*  E  */ [WK,__,__,__,__,__,__,BK],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,BP,__],
        /*  H  */ [__,__,__,__,__,__,__,BR],
    ];

    it('can advance left', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'C5');
        expect(answer).toBe(true);
    });

    it('can advance right', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'F6');
        expect(answer).toBe(true);
    });

    it('can retreat left', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'A1');
        expect(answer).toBe(true);
    });

    it('can retreat right', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'G1');
        expect(answer).toBe(true);
    });

    it('cannot move unequal forward and right displacements', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'H6');
        expect(answer).toBe(false);
    });

    it('canot move laterally', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'H4');
        expect(answer).toBe(false);
    });

    it('canot advance forward', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'D8');
        expect(answer).toBe(false);
    });

    it('cannot capture own piece', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'B6');
        expect(answer).toBe(false);
    });

    it('can capture opponent piece', () => { 

        const answer = bishopCanMove(bishop1Board, 'D4', 'G7');
        expect(answer).toBe(true);
    });

    it('cannot move beyond a piece', () => {

        const answer = bishopCanMove(bishop1Board, 'D4', 'H8');
        expect(answer).toBe(false);
    });

    it('Cannot put self in check', () => {

        const board: Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [WK,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,__,__,__,__,__,__,__],
            /*  D  */ [__,__,__,WB,__,__,__,__],
            /*  E  */ [__,__,__,__,__,__,__,BK],
            /*  F  */ [__,__,__,__,__,__,__,__],
            /*  G  */ [__,__,__,__,__,__,BB,__],
            /*  H  */ [__,__,__,__,__,__,__,BR],
        ];
            
        expect(bishopCanMove(board, 'D4', 'E3')).toBe(false);  
        expect(bishopCanMove(board, 'D4', 'C5')).toBe(false);  
    });


    it('Can move along axis of potential check while blocking check', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WK,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,WB,__,__,__,__],
        /*  E  */ [__,__,__,__,__,__,__,BK],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,BB,__],
        /*  H  */ [__,__,__,__,__,__,__,BR],
        ];


        expect(bishopCanMove(board, 'D4', 'C3')).toBe(true);  
        expect(bishopCanMove(board, 'D4', 'B2')).toBe(true);  
        expect(bishopCanMove(board, 'D4', 'E5')).toBe(true);  
        expect(bishopCanMove(board, 'D4', 'F6')).toBe(true);  
        expect(bishopCanMove(board, 'D4', 'G7')).toBe(true);  
    });
})