/**
 * UFSC: Cartão RU
 *
 * App criado para a Disciplica de Banco de Dados em 2019-2.
 * 
 * Igor Enrick de Carvalho, 18250348.
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

//Import the loading screen.
import Loading from './screens/Loading'

import Home from './screens/Home';

const AppStack = createStackNavigator(
  {
    BottomNavig: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'BottomNavig',
    mode: 'modal',
    headerMode: 'none',
  }
);

const LoadingSwitch = createSwitchNavigator(
    {
      Loading: {
        screen: Loading,
      },
      App: {
        screen: AppStack,
      }
    },
    {
      initialRouteName: 'Loading',
    }
);

export default createAppContainer(LoadingSwitch);
