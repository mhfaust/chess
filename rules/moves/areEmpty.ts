import { pieceAt } from "rules/positions";
import { PositionName } from "rules/positions/positionName";
import { Board } from "rules/types/Board";

const areEmpty = (board: Board, ...squares: PositionName[]) => {
  return squares.every(square => pieceAt(board, square) === null);
}

export default areEmpty;