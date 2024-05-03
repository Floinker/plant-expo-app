import { Dimensions, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { LineChartHistoryEntry } from '../screens/PotStatScreen';

type Props = {
  title: string;
  colors: {
    backgroundColor: string;
    backgroundGradientFrom: string;
    backgroundGradientTo: string;
  };
  data: LineChartHistoryEntry[];
};

const HistoryChart: React.FC<Props> = (props: Props) => {
  const [firstLabelIndex, setFirstLabelIndex] = useState<number>(0);
  const [secondLabelIndex, setSecondLabelIndex] = useState<number>(0);
  const [thirdLabelIndex, setThirdLabelIndex] = useState<number>(0);
  const [fourthLabelIndex, setFourthLabelIndex] = useState<number>(0);

  const [timescale, setTimescale] = useState<string[]>([]);

  useEffect(() => {
    setTimescale(calculateTimescale(props.data));
  }, []);

  const calculateTimescale = (data: LineChartHistoryEntry[]) => {
    const result: string[] = [];

    const resultSize = data.length;
    const step = Math.floor(resultSize / 4);
    let labelIndex = 0;
    setFirstLabelIndex(labelIndex);
    labelIndex += step;
    setSecondLabelIndex(labelIndex);
    labelIndex += step;
    setThirdLabelIndex(labelIndex);
    labelIndex += step;
    setFourthLabelIndex(labelIndex);

    data.forEach((entry: LineChartHistoryEntry) => {
      let timestamp: Date = new Date(entry.timestamp);

      let hourString: string = timestamp.getHours().toString();
      hourString = hourString.length === 1 ? '0' + hourString : hourString;
      let minuteString: string = timestamp.getMinutes().toString();
      minuteString =
        minuteString.length === 1 ? '0' + minuteString : minuteString;
      result.push(hourString + ':' + minuteString);
    });

    console.log(result);

    return result;
  };

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        }}
      >
        {props.title}
      </Text>
      <LineChart
        data={{
          labels: [
            timescale[firstLabelIndex],
            timescale[secondLabelIndex],
            timescale[thirdLabelIndex],
            timescale[fourthLabelIndex],
          ],
          datasets: [
            {
              data: props.data.map((entry: LineChartHistoryEntry) => {
                return entry.value;
              }),
            },
            {
              data: [0],
              color: () => 'transparent',
              strokeWidth: 0,
              withDots: false,
            },
            {
              data: [100],
              color: () => 'transparent',
              strokeWidth: 0,
              withDots: false,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={250}
        yAxisSuffix=" %"
        chartConfig={{
          count: 30,
          backgroundColor: props.colors.backgroundColor,
          backgroundGradientFrom: props.colors.backgroundGradientFrom,
          backgroundGradientTo: props.colors.backgroundGradientTo,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: props.colors.backgroundGradientTo,
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default HistoryChart;
