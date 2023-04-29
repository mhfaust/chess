import isOccupied  from 'logic/squares/isOccupied'
import { initialBoard } from 'logic/position/initialPosition';

describe('isOccupied', () => {
    it('reports true for rook on initial square', () => {
        expect(isOccupied(initialBoard, 'a1')).toBe(true);
    })

    it('reports false for empty square', () => {
        expect(isOccupied(initialBoard, 'a3')).toBe(false);
    })
})