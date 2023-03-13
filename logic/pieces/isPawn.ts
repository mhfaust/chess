import { Piece } from 'logic/positions/piece';
import { PieceOrEmpty } from 'logic/types/Board';

const isPawn = (p: PieceOrEmpty) => ['Black Pawn', 'White Pawn'].includes(p as Piece)

export default isPawn;