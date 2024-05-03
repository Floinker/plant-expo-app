import PotList from '../pots/PotList';
import { View } from 'react-native';

type Props = {
  navigation: any;
};
const HomeScreen: React.FC<Props> = (props: Props) => {
  return (
    <View>
      <PotList navigation={props.navigation} />
    </View>
  );
};

export default HomeScreen;
