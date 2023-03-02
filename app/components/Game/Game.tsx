'use client'

import ChessBoard from 'app/components/ChessBoard/ChessBoard';
import { useGameStore } from 'app/state/gameStore';
import { PositionName } from 'rules/positions/positionName';
import { canMoveTo } from 'rules/moves';
import { Player } from 'rules/types/Player';
import { playerAt } from 'rules/positions';
import Captures from '../Captures';
import allPieceMoves from 'rules/moves/allPieceMoves';


/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function Game() {

  const { 
    moves, 
    boards, 
    toggleSquare, 
    selectedSquare, 
    makeNextMove,
    castling,
    enPassantSquares,
    capturedBlacks,
    capturedWhites
  } = useGameStore();

  const currentBoard = [...boards].pop()!;

  const currentPlayer: Player = boards.length % 2 === 1 ? "White" : "Black";

  if(!currentBoard){
    return null;
  }

  const validMoves = selectedSquare 
    && allPieceMoves(
      currentBoard, 
      selectedSquare, 
      castling.get(currentBoard), 
      enPassantSquares.get(currentBoard) 
    ) || undefined;

  const handleClickSquare = (clickedSquare: PositionName) => {

    const playerAtClicked = playerAt(currentBoard, clickedSquare);

    if(!selectedSquare){
      //make selection if the player has a piece there:
      const isPlayersPiece = currentPlayer === playerAtClicked;

      return toggleSquare(isPlayersPiece ? clickedSquare : null)
    }

    if (selectedSquare === clickedSquare){
      //just re-clicked the selected square, so turn it off
      return toggleSquare(null);
    }

    if (canMoveTo(
      currentBoard, 
      selectedSquare, 
      clickedSquare,
      castling.get(currentBoard),
      enPassantSquares.get(currentBoard),
    )) {
      makeNextMove(selectedSquare, clickedSquare);
      console.log(`valid move: ${selectedSquare} --> ${clickedSquare}`)
      return toggleSquare(null)
    } 
    
    if(currentPlayer === playerAt(currentBoard, clickedSquare)){
      console.log('Tansferring selected square to another piece')
      return toggleSquare(clickedSquare)
    }

    console.log(`cannot move:  ${selectedSquare} --> ${clickedSquare}`);
    return;
  }

  return (
    <div style={{ width: '600px'}}>
      <Captures captures={capturedWhites.get(currentBoard)!} />
      <ChessBoard 
        board={currentBoard} 
        orientation={0}
        onClickSquare={handleClickSquare}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
      />
      <Captures captures={capturedBlacks.get(currentBoard)!} />
      <div>Turn: {currentPlayer}</div>
      <div>Selected Square: {selectedSquare}</div>
      <div>En Passant Square: {enPassantSquares.get(currentBoard)}</div>
    </div>
  )
}
