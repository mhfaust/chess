import { isCheckmate, isInCheck } from 'logic/check';
import { currentBoard } from 'logic/game/selectors/boards';
import currentPlayer from 'logic/game/selectors/players';
import { useGameStore } from 'app/utils/useGameStore';
import { otherPlayer } from 'logic/squares';
import styles from './GameStatus.module.css';

const GameStatus = () => {
  const thisPlayer = useGameStore(currentPlayer);
  const thisBoard = useGameStore(currentBoard);
  
  return (
    <div className={styles.gameStatus} >

    {isCheckmate(thisBoard, thisPlayer) ? (
      <div>
        <div>CHECKMATE -- {otherPlayer(thisPlayer)} WINS</div>
        <button>New Game</button>
      </div>
    ) : isInCheck(thisBoard, thisPlayer) && (
      <div>
        <>{thisPlayer} is in check</>
      </div>
    )}
    </div>

  )
}

export default GameStatus;