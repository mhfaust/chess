import positionName  from 'logic/positions/positionName'

describe('positionName', () => {
    it('gets a1 for [0,0]', () => {
        expect(positionName([0,0])).toBe('a1');
    })
})