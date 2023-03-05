import { initialBoard, move, nextCastlingPreclusions } from 'rules/board';
import { Move } from 'rules/game/validateMoves';
import { PositionName } from 'rules/positions/positionName';
import { Board } from 'rules/types/Board';
import { create } from 'zustand';
import { otherPlayer, pieceAt, playerAt } from 'rules/positions';
import { CastlingPreclusions } from 'rules/types/CastlingPreclusions';
import enPassantSquare, { pawnPositionFromEpSquare } from 'rules/moves/enPassantSquare';
import { Piece } from 'rules/positions/piece';
import { Player } from 'rules/types/Player';
import isPawn from 'rules/pieces/isPawn';

type GameStoreState = {
  currentPlayer: Player;
  moves: Move[];
  boards: Board[];
  selectedSquare: PositionName | null;
  castling: Map<Board, CastlingPreclusions>;
  enPassantSquares: Map<Board, PositionName | null>;
  capturedBlacks: Map<Board, Piece[]>;
  capturedWhites: Map<Board, Piece[]>;
  toggleSelectedSquare: (PositionName: PositionName | null) => void;
  makeNextMove: (from: PositionName, to: PositionName, promoteTo?: Piece, captureEp?: boolean) => void;
}

export const useGameStore = create<GameStoreState>((set) => {
  
  const startBoard: Board = initialBoard();

  return {
    currentPlayer: 'White',
    moves: [],
    boards: [startBoard],
    selectedSquare: null,
    castling: new Map<Board, CastlingPreclusions>().set(startBoard, new Set()),
    enPassantSquares: new Map<Board, PositionName | null>().set(startBoard, null),
    capturedBlacks: new Map().set(startBoard, []),
    capturedWhites: new Map().set(startBoard, []),
    toggleSelectedSquare: (positionName) => {
      return set(({ selectedSquare, boards }) => {
        const lastBoard = [...boards].pop()!;

        const isAnotherPieceOfSamePlayer = selectedSquare
          && positionName 
          && selectedSquare !== positionName
          && playerAt(lastBoard, positionName) === playerAt(lastBoard, selectedSquare);
        
        const togglesOn = positionName && positionName !== selectedSquare;

        const nextSelectedSquare = isAnotherPieceOfSamePlayer || togglesOn 
          ? positionName 
          : null; 

        return { selectedSquare:  nextSelectedSquare }
      })
    },
    makeNextMove: (from, to, promoteTo) => {
      return set(({ 
          boards, 
          moves, 
          castling, 
          enPassantSquares, 
          capturedBlacks, 
          capturedWhites,
          currentPlayer: previousPlayer,
        }) => {

        const lastBoard = [...boards].pop()!;

        const epSquare = isPawn(pieceAt(lastBoard, from))
          && enPassantSquares.get(lastBoard) === to
            ? to : null;

        const nextBoard = move(lastBoard, from, to, epSquare, promoteTo);

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
          moves: [...moves, [from, to] as Move],
          boards: [...boards, nextBoard],
          castling: newCastling,
          enPassantSquares: newEnPassantSquares,
          capturedBlacks: newBlacksMap,
          capturedWhites: newWhitesMap
        })
      })
    },
  }
});
