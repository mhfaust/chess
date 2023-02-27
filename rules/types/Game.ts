
import { Board } from 'rules/types/Board';
import { Piece }  from 'rules/positions/piece';
import { Player }  from 'rules/types/Player';
import { PositionName }  from 'rules/positions/positionName';
import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';

export type Turn = {
  boardAfterMove: Board,
  annotationsAfterMove: BoardAnnotations
}

export type BoardAnnotations = {
  lastPlayerMoved: Player;
  lastPieceMoved: Piece;
  lastMoveFrom: PositionName;
  lastMoveTo: PositionName;
  whoseTurn: Player;
  isInCheck: boolean;
  isCheckmate: boolean;
  capturedBlackPieces: Array<Piece>,
  capturedWhitePieces: Array<Piece>,
  castlingPreclusions: CastlingPreclusions
}

export type Game = Array<Turn>


