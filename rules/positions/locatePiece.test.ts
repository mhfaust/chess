import locatePiece  from 'rules/positions/locatePiece';
import { initialBoard }  from 'rules/board';
import COORDS  from 'rules/positions/coordinates'


describe('locatePiece', () => {
    it('locates White King in the initial board', () => {
        expect(locatePiece(initialBoard(), 'White King' )).toEqual('E1')
    });
    it('locates White Queen in the initial board', () => {
        expect(locatePiece(initialBoard(), 'White Queen' )).toEqual('D1')
    });
})