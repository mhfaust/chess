
import { Board } from 'logic/types/Board';
import { Piece }  from 'logic/squares/piece';
import { Player }  from 'logic/types/Player';
import { Square }  from 'logic/squares/square';
import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';

export type BoardAnnotations = {
  // lastPlayerMoved: Player;
  lastPieceMoved: Piece | null;
  lastMoveFrom: Square | null;
  lastMoveTo: Square | null;
  currentPlayer: Player;
  isInCheck: boolean;
  isCheckmate: boolean;
  capturedBlackPieces: Piece[],
  capturedWhitePieces: Piece[],
  castlingPreclusions: CastlingPreclusions
}
