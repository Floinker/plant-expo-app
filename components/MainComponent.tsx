import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const styles = useStyles();

  return <View style={styles.container}></View>;
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
}));
