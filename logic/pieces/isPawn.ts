import { Piece } from 'logic/squares/piece';
import { PieceOrEmpty } from 'logic/types/Position';

const isPawn = (p: PieceOrEmpty) => ['Black Pawn', 'White Pawn'].includes(p as Piece);

export default isPawn;
