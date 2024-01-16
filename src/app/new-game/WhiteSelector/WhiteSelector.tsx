import { Root, Item, Indicator } from '@radix-ui/react-radio-group';
import styles from './WhiteSelector.module.css'
import { Flex } from '@radix-ui/themes';

export type PlaysWhite = 'self' | 'opponent' | 'random';

type WhiteSelectorProps = {
  userName: string,
  opponentName: string,
  onWhiteSelect: (playsWhite: PlaysWhite) => void,
}

const WhiteSelector = ({
  userName,
  opponentName,
  onWhiteSelect,
}: WhiteSelectorProps) => {


  return (
    <Root onValueChange={onWhiteSelect} className={styles.root}>
      <Flex direction='row' align='center' gap='2'>
        <Item value="random" className={styles.item}>
            <Indicator className={styles.indicator}/>
        </Item>
        <label>Random</label>
      </Flex>
      
      <Flex direction='row' align='center' gap='2'>
        <Item value="opponent" className={styles.item}>
          <Indicator className={styles.indicator}/>
        </Item>
        <label>Your opponent</label>
      </Flex>
      <Flex direction='row' align='center' gap='2'>
        <Item value="self" className={styles.item}>
            <Indicator className={styles.indicator}/>
        </Item>
        <label>You</label>
      </Flex>
    </Root>
  );
};

export default WhiteSelector;