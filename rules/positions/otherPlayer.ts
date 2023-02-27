import { Player }  from 'rules/types/Player';

function otherPlayer (player: Player): Player {
    return player === 'White' ? 'Black' : 'White'
}
export default otherPlayer;