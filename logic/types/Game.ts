
import { Board } from 'logic/types/Board';
import { Piece }  from 'logic/positions/piece';
import { Player }  from 'logic/types/Player';
import { PositionName }  from 'logic/positions/positionName';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';

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
