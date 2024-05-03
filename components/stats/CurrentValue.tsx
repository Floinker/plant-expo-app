import { Card } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

type Props = {
  title: string;
  color: {
    r: number;
    g: number;
    b: number;
  };
  value: number;
  isTitleHidden: boolean;
};

const CurrentValue: React.FC<Props> = (props: Props) => {
  const chartValue = props.value / 100;

  return (
    <Card
      containerStyle={{
        borderRadius: 20,
        backgroundColor: 'white',
        paddingLeft: 0,
        paddingVertical: 0,
        marginRight: 0,
        marginLeft: 0,
        paddingBottom: 0,
      }}
    >
      {!props.isTitleHidden && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 0,
          }}
        >
          {props.title}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 0,
        }}
      >
        <ProgressChart
          data={[chartValue]}
          width={100}
          height={100}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            color: (opacity = 1) =>
              `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 45,
              marginBottom: 0,
            },
          }}
          strokeWidth={10}
          radius={22}
          hideLegend
        />
        <Text style={{ fontSize: 45, fontWeight: 'bold' }}>{props.value}%</Text>
      </View>
    </Card>
  );
};

export default CurrentValue;
