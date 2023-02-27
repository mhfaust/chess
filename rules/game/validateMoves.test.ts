import { PositionName }  from 'rules/positions/positionName';
import validateGameMoves, { Move }  from 'rules/game/validateMoves';
import textRender  from 'rules/board/textRender';
// import asciiBoard  from 'rules/board/'

const moves: Move[] = [
  ["E2", 'E4'], ['E7', 'E6'],
  ['D2', 'D4'], ['D7', 'D5'],
  ['B1', 'C3'], ['F8', 'B4'],
  ['E4', 'E5']
];

describe("validateMoves", () => {

  it ('Validates an valid game correctly', () => {
    const { validMoves, error } = validateGameMoves(moves);
    // const m = validMoves.pop();
    // console.log(textRender(m.board))
    expect(error).toBe(null);
  })
})

