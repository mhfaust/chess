import locatePiece  from 'logic/positions/locatePiece';
import { initialBoard }  from 'logic/board';
import COORDS  from 'logic/positions/coordinates'


describe('locatePiece', () => {
    it('locates White King in the initial board', () => {
        expect(locatePiece(initialBoard(), 'White King' )).toEqual('E1')
    });
    it('locates White Queen in the initial board', () => {
        expect(locatePiece(initialBoard(), 'White Queen' )).toEqual('D1')
    });
})