import { initialBoard, move } from 'rules/board';
import { Move } from 'rules/game/validateMoves';
import positionName, { PositionName } from 'rules/positions/positionName';
import { Board } from 'rules/types/Board';
import { create } from 'zustand';
import textRender from 'rules/board/textRender';


const startBoard: Board = initialBoard();

type GameStoreState = {
  moves: Move[];
  boards: Board[];
  selectedSquare: PositionName | null;
  toggle: (PositionName: PositionName | null) => void;
  nextMove: (from: PositionName, to: PositionName) => void;
}

export const useGameStore = create<GameStoreState>((set) => ({
  moves: [],
  boards: [startBoard],
  selectedSquare: null,
  toggle: (positionName) => {
    return set(({ selectedSquare }) => {

      const valOrNull = [null,  selectedSquare].includes(positionName) 
        ? null 
        : positionName
      
      // positionName === null 
      //   ? null 
      //   : selectedSquare === positionName ? null : positionName
      return { selectedSquare: valOrNull }
    })
  },
  nextMove: (from, to) => {
    return set(({ boards, moves }) => {
      const lastBoard= boards[boards.length -1];
      const nextBoard = move(lastBoard, from, to);
      console.log(textRender(nextBoard))
      return ({ 
        moves: [...moves, [from, to]],
        boards: [...boards, nextBoard]
       })
    })
  }
}));
