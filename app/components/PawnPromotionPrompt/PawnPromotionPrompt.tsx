import { useGameStore } from 'app/components/Game/gameStore';
import { blackPromotionOptions, whitePromotionOptions } from 'logic/board/pawnPromotionOptions';
import { unicodeSymbols } from 'logic/constants/pieces';
import { Piece } from 'logic/positions/piece';
import styles from './PawnPromotionPrompt.module.css';

export type PawnPromotionOptionsProps = {
  onPromote: ((selection: Piece) => void) | null;
}

const PawnPromotionOptions = ({ onPromote }: PawnPromotionOptionsProps) => {

  const { boards, currentPlayer } = useGameStore();
  if(!onPromote){
    return null;
  }

  const options = currentPlayer === "White" 
    ? whitePromotionOptions 
    : blackPromotionOptions;

    return (
      <div className={styles.screen}>
        <div className={styles.main}>
          Promote pawn as:<br />
          {options.map(option => (
            <div 
              key={option} 
              onClick={() => onPromote(option)}
              className={styles.option}
            >
              {unicodeSymbols[option]}&nbsp;{option.substring(6)}
            </div>
          ))}
        </div>
      </div>
    );
};

export default PawnPromotionOptions;