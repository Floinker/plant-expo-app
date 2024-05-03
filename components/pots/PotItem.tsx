import { FlatList, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Humidity,
  PotConfig,
  WaterLevel,
  getCurrentPotHumidity,
  getCurrentPotWaterLevel,
  getPots,
  pingPot,
} from '../../web/pot.service';
import { Button, Card, Icon } from '@rneui/themed';
import {
  Table,
  Rows,
  Row,
  Cell,
  TableWrapper,
  Cols,
} from 'react-native-table-component';
import CurrentValue from '../stats/CurrentValue';

type Props = {
  potConfig: PotConfig;
  navigation: any;
};

const PotItem: React.FC<Props> = (props: Props) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const [waterLevel, setWaterLevel] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);

  useEffect(() => {
    pingPot(props.potConfig.id)
      .then((data) => {
        data.status === 200 ? setIsOnline(true) : setIsOnline(false);
        return data;
      })
      .catch((error) => {
        console.error(error);
        setIsOnline(false);
      });
  }, []);

  useEffect(() => {
    // Fetch water level and humidity
    getCurrentPotWaterLevel(props.potConfig.id).then((response) => {
      setWaterLevel((response as WaterLevel).waterLevel);
    });

    getCurrentPotHumidity(props.potConfig.id).then((response) => {
      setHumidity((response as Humidity).humidity);
    });
  }, []);

  return (
    <Card containerStyle={{ borderRadius: 20, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          Smart Pot {props.potConfig.id}
        </Text>
        <Icon
          name="circle"
          type="font-awesome"
          color={isOnline ? '#1ed35a' : '#ff0000'}
          size={30}
          style={{ minWidth: 40, marginRight: 0 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          reverse
          name="tree"
          type="font-awesome"
          color="#41ac38"
          size={60}
        />
        <View style={{ flex: 1 }}>
          <CurrentValue
            color={{ r: 0, g: 0, b: 255 }}
            title="Water-Level"
            value={waterLevel}
            isTitleHidden={false}
          />
          <View style={{ width: 5 }} />
          <CurrentValue
            color={{ r: 251, g: 140, b: 0 }}
            title="Humidity"
            value={humidity}
            isTitleHidden={false}
          />
        </View>
      </View>
      <Button
        title="View Statistics"
        onPress={() => {
          props.navigation.navigate('Statistics', {
            potConfig: props.potConfig,
            isOnline: isOnline,
          });
        }}
        style={{ marginTop: 15 }}
        //disabled={!isOnline}
      />
    </Card>
  );
};

export default PotItem;
