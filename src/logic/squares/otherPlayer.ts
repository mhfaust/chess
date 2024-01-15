import { Player } from '@/logic/types/Player';

function otherPlayer(player: Player): Player {
	return player === 'White' ? 'Black' : 'White';
}
export default otherPlayer;
