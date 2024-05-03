import { Icon } from '@rneui/themed';
import React from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

type Props = {
  title: string;
  icon: string;
  iconFamily: string;
  iconColor: string;
  onPress: () => void;
};

const CardButton: React.FC<Props> = (props: Props) => {
  return (
    <View
      style={{
        width: '50%',
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={props.onPress}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {props.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon
              name={props.icon}
              type={props.iconFamily}
              color={props.iconColor}
              size={84}
              style={{ minWidth: 40, minHeight: 90, marginVertical: 10 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardButton;
