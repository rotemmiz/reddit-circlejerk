import { Navigation } from 'react-native-navigation';

import MainScreen from './main-screen';
import GameScreen from './game-screen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('reci.MainScreen', () => MainScreen, store, Provider);
  Navigation.registerComponent('reci.GameScreen', () => GameScreen, store, Provider);
}
