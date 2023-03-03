import { initialBoard, move, nextCastlingPreclusions } from 'rules/board';
import { Move } from 'rules/game/validateMoves';
import positionName, { PositionName } from 'rules/positions/positionName';
import { Board } from 'rules/types/Board';
import { create } from 'zustand';
import textRender from 'rules/board/textRender';
import { pieceAt, playerAt } from 'rules/positions';
import { CastlingPreclusions } from 'rules/types/CastlingPreclusions';
import enPassantSquare, { pawnPositionFromEpSquare } from 'rules/moves/enPassantSquare';
import { Piece } from 'rules/positions/piece';
import { BLACK_PIECES, WHITE_PIECES } from 'rules/constants/pieces';
import { Player } from 'rules/types/Player';

type GameStoreState = {
  currentPlayer: Player;
  moves: Move[];
  boards: Board[];
  selectedSquare: PositionName | null;
  castling: Map<Board, CastlingPreclusions>;
  enPassantSquares: Map<Board, PositionName | null>;
  capturedBlacks: Map<Board, Piece[]>;
  capturedWhites: Map<Board, Piece[]>;
  toggleSquare: (PositionName: PositionName | null) => void;
  makeNextMove: (from: PositionName, to: PositionName, promoteTo?: Piece) => void;
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
    toggleSquare: (positionName) => {
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
          capturedWhites
        }) => {
        const lastBoard = [...boards].pop()!;
        const nextBoard = move(lastBoard, from, to, enPassantSquares.get(lastBoard), promoteTo);

        console.log(textRender(nextBoard));

        const newCastling = new Map(castling).set(
          nextBoard,
          nextCastlingPreclusions(from, castling.get(lastBoard))
        );

        const newEnPassantSquares = new Map(enPassantSquares).set(
          nextBoard,
          enPassantSquare(nextBoard, from, to)
        );

        const passantPawnPosition = pawnPositionFromEpSquare.get(to);
        const passantPawn = passantPawnPosition && pieceAt(lastBoard, passantPawnPosition);
        const blackPassantPawn = BLACK_PIECES.has(passantPawn!) && passantPawn;
        const whitePassantPawn = WHITE_PIECES.has(passantPawn!) && passantPawn;
        const newBlacksMap = new Map(capturedBlacks);
        const prevBlackCaptureds = capturedBlacks.get(lastBoard)!;

        const newBlackCaptureds = playerAt(lastBoard, to) === "Black"
          ? [...prevBlackCaptureds, pieceAt(lastBoard, to)!]
          : blackPassantPawn
          ? [...prevBlackCaptureds, blackPassantPawn]
          : [...prevBlackCaptureds];
        
        const newWhitesMap = new Map(capturedWhites);
        const prevWhiteCaptureds = capturedWhites.get(lastBoard)!;

        const newWhiteCaptureds = playerAt(lastBoard, to) === "White"
          ? [...prevWhiteCaptureds, pieceAt(lastBoard, to)!]
          : whitePassantPawn
          ? [...prevWhiteCaptureds, whitePassantPawn]
          : [...prevWhiteCaptureds];

        newBlacksMap.set(nextBoard, newBlackCaptureds);
        newWhitesMap.set(nextBoard, newWhiteCaptureds);

        const currentPlayer = (['White', 'Black'] as const)[boards.length % 2];
        return ({ 
          currentPlayer,
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
