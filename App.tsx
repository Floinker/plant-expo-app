import React from 'react';
import { createTheme, ThemeProvider } from '@rneui/themed';
import Component from './components/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen';
import PotStatScreen from './components/screens/PotStatScreen';

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Statistics" component={PotStatScreen} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
