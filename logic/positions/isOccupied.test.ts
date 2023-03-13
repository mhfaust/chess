import isOccupied  from 'logic/positions/isOccupied'
import { initialBoard }  from 'logic/board'

describe('isOccupied', () => {
    it('reports true for initially positioned rook', () => {
        expect(isOccupied(initialBoard(), 'A1')).toBe(true);
    })

    it('reports false for empty square', () => {
        expect(isOccupied(initialBoard(), 'A3')).toBe(false);
    })
})