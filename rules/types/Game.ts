
import { Board } from 'rules/types/Board';
import { Piece }  from 'rules/positions/piece';
import { Player }  from 'rules/types/Player';
import { PositionName }  from 'rules/positions/positionName';
import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';

export type BoardAnnotations = {
  // lastPlayerMoved: Player;
  lastPieceMoved: Piece | null;
  lastMoveFrom: PositionName | null;
  lastMoveTo: PositionName | null;
  currentPlayer: Player;
  isInCheck: boolean;
  isCheckmate: boolean;
  capturedBlackPieces: Piece[],
  capturedWhitePieces: Piece[],
  castlingPreclusions: CastlingPreclusions
}
