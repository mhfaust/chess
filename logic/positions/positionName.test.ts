import square  from 'logic/positions/positionName'

describe('positionName', () => {
    it('gets a1 for [0,0]', () => {
        expect(square([0,0])).toBe('a1');
    })
})