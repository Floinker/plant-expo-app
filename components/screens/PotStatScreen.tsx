import { View, Text, ScrollView } from 'react-native';
import {
  PotConfig,
  getPlantPotDetails,
  postActivatePump,
  postIdentify,
  putSettings,
} from '../../web/pot.service';
import HistoryChart from '../stats/HistoryChart';
import { useEffect, useState } from 'react';
import CardButton from '../stats/CardButton';
import { Button, Dialog, Icon, Input } from '@rneui/themed';

export type LineChartHistoryEntry = {
  id: number;
  value: number;
  timestamp: Date;
};

export type PlantPotDetails = {
  potId: number;
  currentHumidity: number;
  currentWaterLevel: number;
  humidityHistory: LineChartHistoryEntry[];
  waterLevelHistory: LineChartHistoryEntry[];
};

type Props = {
  navigation: any;
  route: any;
};

const PotStatScreen: React.FC<Props> = (props: Props) => {
  const potConfig = props.route.params.potConfig as PotConfig;
  const isOnline = props.route.params.isOnline as boolean;

  const [settingsData, setSettingsData] = useState<PotConfig>({
    id: potConfig.id,
    ipAddress: potConfig.ipAddress,
    waterAmount: potConfig.waterAmount,
    warnThreshold: potConfig.warnThreshold,
    warnDuration: potConfig.warnDuration,
  });

  const tableData = [
    [
      <Icon
        name="network-wired"
        type="font-awesome-5"
        color="#000000"
        size={25}
        style={{ minWidth: 40 }}
      />,
      potConfig.ipAddress,
    ],
    [
      <Icon
        name="water"
        type="font-awesome-5"
        color="#1457d3"
        size={25}
        style={{ minWidth: 40 }}
      />,
      potConfig.waterAmount,
    ],
    [
      <Icon
        name="warning"
        type="font-awesome"
        color="#fbd500"
        size={25}
        style={{ minWidth: 40 }}
      />,
      potConfig.warnThreshold,
    ],
    [
      <Icon
        name="clock"
        type="font-awesome-5"
        color="#061522"
        size={25}
        style={{ minWidth: 30 }}
      />,
      potConfig.warnDuration,
    ],
  ];

  const [waterHistory, setWaterHistory] = useState<LineChartHistoryEntry[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<
    LineChartHistoryEntry[]
  >([]);

  const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [currentDialogTitle, setCurrentDialogTitle] = useState<string>('');
  const [currentDialogDescription, setCurrentDialogDescription] =
    useState<string>('');
  const [currentDialogIcon, setCurrentDialogIcon] = useState<string>('');
  const [currentDialogIconColor, setCurrentDialogIconColor] =
    useState<string>('');
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const handleSettingsPressed = () => {
    setIsSettingsVisible(true);
  };

  const handlePumpPressed = () => {
    setIsLoadingRequest(true);
    setIsDialogVisible(true);
    setCurrentDialogTitle('Pump Test');

    postActivatePump(potConfig.id)
      .then((json) => {
        if (json.status === 200) {
          setIsLoadingRequest(false);
          setCurrentDialogDescription('Testing pump...');
          setCurrentDialogIcon('check');
          setCurrentDialogIconColor('#1ed35a');
        } else {
          setIsLoadingRequest(false);
          setCurrentDialogDescription('Error while testing pump...');
          setCurrentDialogIcon('exclamation-triangle');
          setCurrentDialogIconColor('#ff0000');
        }

        return json;
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingRequest(false);
        setCurrentDialogDescription('Error sending request to plant pot...');
        setCurrentDialogIcon('exclamation-triangle');
        setCurrentDialogIconColor('#ff0000');
      });
  };

  const handleSaveSettingsPressed = () => {
    setIsSettingsVisible(false);
    setIsLoadingRequest(true);
    setIsDialogVisible(true);
    setCurrentDialogTitle('Saving Settings');
    putSettings(potConfig.id, settingsData as PotConfig)
      .then((json) => {
        if (json.status === 200) {
          setIsLoadingRequest(false);
          setIsDialogVisible(true);
          setCurrentDialogIconColor('#1ed35a');
        } else {
          setIsLoadingRequest(false);
          setCurrentDialogDescription('Error saving settings...');
          setCurrentDialogIcon('exclamation-triangle');
          setCurrentDialogIconColor('#ff0000');
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingRequest(false);
        setCurrentDialogDescription('Error saving settings...');
        setCurrentDialogIcon('exclamation-triangle');
        setCurrentDialogIconColor('#ff0000');
      });
  };

  const handleIdentifyPressed = () => {
    setIsLoadingRequest(true);
    setIsDialogVisible(true);
    setCurrentDialogTitle('Identify Pot');

    postIdentify(potConfig.id, 30)
      .then((json) => {
        if (json.status === 200) {
          setIsLoadingRequest(false);
          setCurrentDialogDescription(
            'Identifying Pot... \nLED will blink for 30 seconds...'
          );
          setCurrentDialogIcon('check');
          setCurrentDialogIconColor('#1ed35a');
        } else {
          console.error(json);
          setIsLoadingRequest(false);
          setCurrentDialogDescription(
            'Error while trying to identify plant pot...'
          );
          setCurrentDialogIcon('exclamation-triangle');
          setCurrentDialogIconColor('#ff0000');
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingRequest(false);
        setCurrentDialogDescription('Error sending request to plant pot...');
        setCurrentDialogIcon('exclamation-triangle');
        setCurrentDialogIconColor('#ff0000');
      });
  };

  useEffect(() => {
    getPlantPotDetails(potConfig.id).then((details: PlantPotDetails) => {
      const data = details;
      console.log(data);
      setWaterHistory(data.waterLevelHistory);
      setHumidityHistory(data.humidityHistory);
    });
  }, []);

  return (
    <ScrollView style={{ marginHorizontal: 5 }}>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: 'white',
          alignItems: 'center',
          paddingVertical: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          Smart Pot {potConfig.id}
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: '50%',
            borderRadius: 16,
            backgroundColor: 'white',
            alignItems: 'center',
          }}
        >
          {tableData.map((rowData, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                padding: 4,
              }}
            >
              {rowData[0]}
              <Text
                style={{ textAlign: 'left', fontSize: 18, fontWeight: 'bold' }}
              >
                {rowData[1]}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ width: 5 }} />
        <CardButton
          title="Settings"
          icon="cogs"
          iconFamily="font-awesome-5"
          iconColor="#777777"
          onPress={handleSettingsPressed}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <CardButton
          title="Pump-Test"
          icon="water"
          iconFamily="font-awesome-5"
          iconColor="#1457d3"
          onPress={handlePumpPressed}
        />
        <View style={{ width: 5 }} />
        <CardButton
          title="Identify"
          icon="lightbulb"
          iconFamily="font-awesome-5"
          iconColor="#fbd500"
          onPress={handleIdentifyPressed}
        />
      </View>
      {waterHistory.length > 0 && (
        <HistoryChart
          title="Water-Level History"
          colors={{
            backgroundColor: '#004fe2',
            backgroundGradientFrom: '#1457d3',
            backgroundGradientTo: '#336dd8',
          }}
          data={waterHistory}
        />
      )}
      {humidityHistory.length > 0 && (
        <HistoryChart
          title="Humidity History"
          colors={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
          }}
          data={humidityHistory}
        />
      )}
      <Dialog isVisible={isDialogVisible} onBackdropPress={toggleDialog}>
        <View
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}
          >
            {currentDialogTitle}
          </Text>
          {isLoadingRequest && <Dialog.Loading />}
          {!isLoadingRequest && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                name={currentDialogIcon}
                type="font-awesome-5"
                color={currentDialogIconColor}
                size={100}
              />
              <Text>{currentDialogDescription}</Text>
            </View>
          )}
        </View>
      </Dialog>
      <Dialog isVisible={isSettingsVisible} onBackdropPress={toggleSettings}>
        <View
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 10,
            }}
          >
            Settings
          </Text>
          <Input
            label="IP Address"
            placeholder="IP"
            defaultValue={potConfig.ipAddress}
            leftIcon={{ type: 'font-awesome-5', name: 'network-wired' }}
            onChangeText={(value) => {
              setSettingsData({ ...settingsData, ipAddress: value });
            }}
            disabled={!isOnline}
          />
          <Input
            label="Water Amount (in ms)"
            placeholder="Water Amount"
            defaultValue={potConfig.waterAmount.toString()}
            leftIcon={{ type: 'font-awesome-5', name: 'water' }}
            onChangeText={(value) => {
              setSettingsData({
                ...settingsData,
                waterAmount: Number.parseInt(value),
              });
            }}
            disabled={!isOnline}
          />
          <Input
            label="Warn Threshold (in %)"
            placeholder="Warn Threshold"
            defaultValue={potConfig.warnThreshold}
            leftIcon={{ type: 'font-awesome', name: 'warning' }}
            onChangeText={(value) => {
              setSettingsData({ ...settingsData, warnThreshold: value });
            }}
            disabled={!isOnline}
          />
          <Input
            label="Warn Duration (in s)"
            placeholder="Warn Duration"
            defaultValue={potConfig.warnDuration}
            leftIcon={{ type: 'font-awesome-5', name: 'clock' }}
            onChangeText={(value) => {
              setSettingsData({ ...settingsData, warnDuration: value });
            }}
            disabled={!isOnline}
          />
        </View>
        <Button
          title="Save Settings"
          onPress={handleSaveSettingsPressed}
          style={{ marginTop: 15 }}
          disabled={!isOnline}
        />
      </Dialog>
    </ScrollView>
  );
};

export default PotStatScreen;
