import generateLinesOfAttack from '@/logic/check/generateLinesOfAttack';
import { Square } from '@/logic/squares/square';
import { Player } from '@/logic/types/Player';
import { Position } from '@/logic/types/Position';

const allLinesOfAttack = (
	position: Position,
	attacker: Player,
	target: Square,
) => {
	const lines = [];
	const iterable = generateLinesOfAttack(position, attacker, target);
	let { value, done } = iterable.next();

	while (!done) {
		lines.push(value);
		let next = iterable.next();
		value = next.value;
		done = next.done;
	}

	return lines;
};

export default allLinesOfAttack;
