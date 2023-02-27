import areSamePositions from './areSamePositions'

describe('areSamePositions', () => {
    it('finds two positions are the same, even though their objects by reference are different', () => {
        const p1 = [3,3];
        const p2 = [3,3];

        const areSameReference = p1 === p2;
        expect(areSameReference).toBe(false);
        expect(areSamePositions(p1, p2)).toBe(true);
    });

    it('finds two positions are different when the vary only by file', () => {
        const p1 = [2,3];
        const p2 = [3,3];

        const areSameReference = p1 === p2;
        expect(areSameReference).toBe(false);
        expect(areSamePositions(p1, p2)).toBe(false);
    });

    it('finds two positions are different when the vary only by rank', () => {
        const p1 = [2,3];
        const p2 = [3,3];

        const areSameReference = p1 === p2;
        expect(areSameReference).toBe(false);
        expect(areSamePositions(p1, p2)).toBe(false);
    });
})