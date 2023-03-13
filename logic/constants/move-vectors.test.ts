import { rookVectors, bishopVectors, knightVectors, kingVectors, queenVectors, pawnBlackAttackVectors, pawnWhiteAttackVectors } from './move-vectors'

describe('move-vectors', () => {
    [
        rookVectors, 
        bishopVectors, 
        knightVectors, 
        kingVectors, 
        queenVectors, 
        pawnBlackAttackVectors, 
        pawnWhiteAttackVectors
    ]
    .forEach(vectors => {
        it('rookVectors', () => {
            //ensures each collection has no undefined items
            //due to the cute way I spaced them out like their pattern on a board
            expect(vectors.some(v => !v)).toBe(false);
            expect(vectors.every(v => v.length === 2)).toBe(true);
        })
    })


})