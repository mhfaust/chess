import locatePiece  from 'logic/squares/locatePiece';
import { initialBoard } from 'logic/board/initialBoard';;
import COORDS  from 'logic/squares/coordinates'


describe('locatePiece', () => {
    it('locates White King in the initial board', () => {
        expect(locatePiece(initialBoard, 'White King' )).toEqual('e1')
    });
    it('locates White Queen in the initial board', () => {
        expect(locatePiece(initialBoard, 'White Queen' )).toEqual('d1')
    });
})