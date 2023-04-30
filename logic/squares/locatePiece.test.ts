import locatePiece  from 'logic/squares/locatePiece';
import { initialPosition } from 'logic/position/initialPosition';;
import COORDS  from 'logic/squares/coordinates'


describe('locatePiece', () => {
    it('locates White King in the initial board', () => {
        expect(locatePiece(initialPosition, 'White King' )).toEqual('e1')
    });
    it('locates White Queen in the initial board', () => {
        expect(locatePiece(initialPosition, 'White Queen' )).toEqual('d1')
    });
})