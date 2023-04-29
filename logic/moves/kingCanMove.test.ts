import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { kingCanMove }  from 'logic/moves';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';
import { Position }  from 'logic/types/Board';
import { Square }  from 'logic/squares/square';

const noPreclusions: CastlingPreclusions = new Set()

describe('kingCanMove', () => {

    it('Cannot move, initially', () => {
        const position: Position = [
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

        const tries: Square[] = ['d1', 'd2', 'e2', 'f2', 'f1']

        tries.forEach(square => {
            expect(kingCanMove(position, 'e1', square, noPreclusions)).toBe(false)
        })
    });

    it('Can move in every direction', () => {
        const position: Position = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [__,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,__,__,__,__,__],
        /*  E  */ [WK,__,__,BK,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,__,__],
        /*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        const tries: Square[] = [ 
            'd3', 'd4', 'd5', 
            'e3',       'e5',
            'f3', 'f4', 'f5'
        ];

        tries.forEach(square => {
            expect(kingCanMove(position, 'e4', square, noPreclusions)).toBe(true)
        })
    });    

    it('Cannot put self in check', () => {
        const position: Position = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [WQ,WP,__,__,__,__,__,BK],
        /*  E  */ [WK,WP,__,__,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,BR],
        /*  G  */ [WN,__,__,__,__,__,__,__],
        /*  H  */ [WR,__,__,__,__,__,__,__], 
        ];

        expect(kingCanMove(position, 'e1', 'f1', noPreclusions)).toBe(false);
    });

    it('White king can castle, king-side', () => {
        const position: Position = [
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

        expect(kingCanMove(position, 'e1', 'g1', noPreclusions)).toBe(true)
    });  
    
    
    it('White king cannot castle across check', () => {
        const position: Position = [
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
    
        expect(kingCanMove(position, 'e1', 'g1', noPreclusions)).toBe(false)
    });

     
    it('White king cannot castle into check', () => {
        const position: Position = [
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

        expect(kingCanMove(position, 'e1', 'g1', noPreclusions)).toBe(false)
    });

    it('Black king can castle, queen-side', () => {
        const position: Position = [
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

        expect(kingCanMove(position, 'e8', 'c8', noPreclusions)).toBe(true)
    });  

    it('White king cannot castle out of check', () => {
        const position: Position = [
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

        const canMove = kingCanMove(position, 'e1', 'g1', new Set());

        expect(canMove).toBe(false)
    }); 
})