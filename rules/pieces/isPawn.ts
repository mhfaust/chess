import { Piece } from 'rules/positions/piece';
import { PieceOrEmpty } from 'rules/types/Board';

const isPawn = (p: PieceOrEmpty) => ['Black Pawn', 'White Pawn'].includes(p as Piece)

export default isPawn;