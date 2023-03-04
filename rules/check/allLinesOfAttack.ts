import { PositionName }  from 'rules/positions/positionName';
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';

import generateLinesOfAttack from './generateLinesOfAttack';

const allLinesOfAttack = (
  board: Board, 
  defender: Player, 
  target: PositionName
) => {
  const lines = [];
  const iterable = generateLinesOfAttack(board, defender, target);
  let { value, done } = iterable.next();

  while (!done) {
    lines.push(value);
    let next = iterable.next();
    value = next.value;
    done = next.done;
  }

  return lines;

}

export default allLinesOfAttack;