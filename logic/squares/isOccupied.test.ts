import isOccupied  from 'logic/squares/isOccupied'
import { initialPosition } from 'logic/position/initialPosition';

describe('isOccupied', () => {
    it('reports true for rook on initial square', () => {
        expect(isOccupied(initialPosition, 'a1')).toBe(true);
    })

    it('reports false for empty square', () => {
        expect(isOccupied(initialPosition, 'a3')).toBe(false);
    })
})