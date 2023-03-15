import { Square }  from 'logic/positions/positionName';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import generateLinesOfAttack from 'logic/check/generateLinesOfAttack';

const allLinesOfAttack = (
  board: Board, 
  defender: Player, 
  target: Square
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