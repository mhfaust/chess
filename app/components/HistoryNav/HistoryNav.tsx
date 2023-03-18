import clsx from "clsx";
import { boardCursor, boardIndexes } from "logic/game/selectors/boards";
import { boards } from "logic/game/selectors/boards";
import { useGameStore } from "logic/game/useGameStore";
import styles from './HistoryNav.module.css';

const HistoryNav = () => {

  const currentBoardIndex = useGameStore(boardCursor);
  const indexes = useGameStore(boardIndexes);
  const toggleBoard = useGameStore().actions.toggleBoard;

  return (
    <div className={styles.historyNav}>
      {indexes.map((i) => (
        <div 
          key={i}
          onClick={() => toggleBoard(i)}
          className={clsx(styles.boardIndex, {
            [styles.currentIndex]: i === currentBoardIndex
          })}
        >
          {i}
        </div>
      ))}
    </div>
  )
}

export default HistoryNav;