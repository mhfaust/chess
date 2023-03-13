import { Piece } from "rules/positions/piece";
import { PositionName } from "rules/positions/positionName";
import { Move } from "rules/game/validateMoves";
import { move, nextCastlingPreclusions } from 'rules/board';
import { otherPlayer, pieceAt, playerAt } from 'rules/positions';
import enPassantSquare, { pawnPositionFromEpSquare } from 'rules/moves/enPassantSquare';
import isPawn from 'rules/pieces/isPawn';
import { OldGameState } from "app/state/gameStore";

const makeNextMove = (
  from: PositionName, 
  to: PositionName, 
  promoteTo: Piece | undefined
): (prev: OldGameState) => Partial<OldGameState> => {

  return (previousState: OldGameState) => {

    const { 
      boards, 
      moves, 
      castling, 
      enPassantSquares, 
      capturedBlacks, 
      capturedWhites,
      currentPlayer: previousPlayer,
    } = previousState;

    const lastBoard = [...boards].pop()!;

    const epSquare = isPawn(pieceAt(lastBoard, from))
      && enPassantSquares.get(lastBoard) === to
        ? to : null;

    const [nextBoard, moveHash] = move(lastBoard, from, to, epSquare, promoteTo);
    const newCastling = new Map(castling).set(
      nextBoard,
      nextCastlingPreclusions(from, castling.get(lastBoard))
    );

    const newEnPassantSquares = new Map(enPassantSquares).set(
      nextBoard,
      enPassantSquare(nextBoard, from, to)
    );

    const newBlacksMap = new Map(capturedBlacks);
    const prevBlackCaptureds = capturedBlacks.get(lastBoard)!;

    const epCapture = epSquare && pieceAt(lastBoard, pawnPositionFromEpSquare.get(epSquare))
    const captured = pieceAt(lastBoard, to) || epCapture;

    const newBlackCaptureds = captured && playerAt(lastBoard, to) === "Black"
      ? [...prevBlackCaptureds, captured]
      : [...prevBlackCaptureds];
    
    const newWhitesMap = new Map(capturedWhites);
    const prevWhiteCaptureds = capturedWhites.get(lastBoard)!;

    const newWhiteCaptureds = captured && playerAt(lastBoard, to) === "White"
      ? [...prevWhiteCaptureds, captured]
      : [...prevWhiteCaptureds];

    newBlacksMap.set(nextBoard, newBlackCaptureds);
    newWhitesMap.set(nextBoard, newWhiteCaptureds);

    return ({ 
      currentPlayer: otherPlayer(previousPlayer),
      moves: [...moves, [from, to, undefined] as Move],
      boards: [...boards, nextBoard],
      castling: newCastling,
      enPassantSquares: newEnPassantSquares,
      capturedBlacks: newBlacksMap,
      capturedWhites: newWhitesMap
    });
  }
};

export default makeNextMove;