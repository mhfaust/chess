import { useGameStore } from "app/state/gameStore";
import { blackPromotionOptions, whitePromotionOptions } from "rules/board/pawnPromotionOptions";
import { unicodeSymbols } from "rules/constants/pieces";
import { Piece } from "rules/positions/piece";
import styles from "./PawnPromotionPrompt.module.css";

export type PawnPromotionOptionsProps = {
  isPrompting: boolean;
  // player: Player;
  onPromote: (selection: Piece) => void;
}

const PawnPromotionOptions = ({ isPrompting, onPromote }: PawnPromotionOptionsProps) => {

  const { boards, currentPlayer } = useGameStore();
  console.log({isPrompting})
  if(!isPrompting){
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