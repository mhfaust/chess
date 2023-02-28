'use client'

import { initialBoard } from 'rules/board'
import ChessBoard from 'app/components/ChessBoard/ChessBoard';
import { useGameStore } from 'app/state/gameStore';
import { PositionName } from 'rules/positions/positionName';
import { canMoveTo } from 'rules/moves';
import { Player } from 'rules/types/Player';
import { playerAt } from 'rules/positions';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

const board = initialBoard();


export default function Game() {

  const { moves, boards, toggle, selectedSquare, nextMove } = useGameStore();
  const currentBoard = [...boards].pop();

  const player: Player = boards.length % 2 === 1 ? "White" : "Black";

  if(!currentBoard){
    return null;
  }


  const handleClickSquare = (positionName: PositionName) => {
    if(selectedSquare && selectedSquare !== positionName){

      if (canMoveTo(currentBoard, selectedSquare, positionName)) {
        toggle(null)
        nextMove(selectedSquare, positionName);
        console.log(`valid move: ${selectedSquare} --> ${positionName}`)
      } else {
        console.log(`cannot move:  ${selectedSquare} --> ${positionName}`)
      }
    } else {
      if(player === playerAt(currentBoard, positionName)){
        toggle(positionName)
      }
    }
  }

  return (
    <ChessBoard 
      board={currentBoard} 
      orientation={0}
      onClickSquare={handleClickSquare}
      selectedSquare={selectedSquare}
    />
  )
}
