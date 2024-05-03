import { FlatList, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { PotConfig, getPots } from '../../web/pot.service';
import PotItem from './PotItem';

type Props = {
  navigation: any;
};
const PotList: React.FC<Props> = (props: Props) => {
  const [pots, setPots] = useState<PotConfig[]>([]);

  useEffect(() => {
    getPots().then((res) => {
      setPots(res as PotConfig[]);
    });
  }, []);

  return (
    <FlatList
      style={{ minHeight: '100%' }}
      data={pots}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PotItem potConfig={item} navigation={props.navigation} />
      )}
    />
  );
};

export default PotList;
