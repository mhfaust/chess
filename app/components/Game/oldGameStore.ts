import { initialBoard, move, nextCastlingPreclusions } from 'logic/board';
import { Square } from 'logic/positions/square';
import { Board } from 'logic/types/Board';
import { create } from 'zustand';
import { otherPlayer, pieceAt, playerAt } from 'logic/positions';
import { CastlingPreclusions } from 'logic/types/CastlingPreclusions';
import enPassantSquare, { pawnPositionFromEpSquare } from 'logic/moves/enPassantSquare';
import isPawn from 'logic/pieces/isPawn';
import { Player } from 'logic/types/Player';
import { Piece } from 'logic/positions/piece';
import { Move } from 'logic/game/selectors/moves';


export type OldGameState =   {
  moves: Move[];
  currentTurn: number;
  currentPlayer: Player;
  boards: Board[];
  selectedSquare: Square | null;
  castling: Map<Board, CastlingPreclusions>;
  enPassantSquares: Map<Board, Square | null>;
  capturedBlacks: Map<Board, Piece[]>;
  capturedWhites: Map<Board, Piece[]>;
  toggleSelectedSquare: (PositionName: Square | null) => void;
  makeNextMove: (from: Square, to: Square, promoteTo?: Piece, captureEp?: boolean) => void;
}

export const useOldGameStore = create<OldGameState>((set) => {
  
  const startBoard: Board = initialBoard();

  return {
    currentTurn: 0,
    currentPlayer: 'White',
    moves: [],
    boards: [startBoard],
    selectedSquare: null,
    castling: new Map<Board, CastlingPreclusions>().set(startBoard, new Set()),
    enPassantSquares: new Map<Board, Square | null>().set(startBoard, null),
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

        const [nextBoard, moveHash] = move(lastBoard, from, to, epSquare, promoteTo);
        console.log(moveHash)
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
          moves: [...moves, [from, to, promoteTo] as Move],
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
