import { Navigation } from 'react-native-navigation';

import MainScreen from './main-screen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('reci.MainScreen', () => MainScreen, store, Provider);
  Navigation.registerComponent('reci.TestScreen', () => MainScreen, store, Provider);
}
