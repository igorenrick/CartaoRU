/**
 * UFSC: Cartão RU
 *
 * App criado para a Disciplica de Banco de Dados em 2019-2.
 * 
 * Igor Enrick de Carvalho, 18250348.
 */

import React, { Component } from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//Import the loading screen.
import Loading from './screens/Loading'

//Import the login screens.
import Login from './screens/login/Login'
import Register from './screens/login/Register'

//Import the app screens.
import Home from './screens/app/Home'
import Card from './screens/app/Card'
import Reload from './screens/app/Reload'
import ReloadSuccess from './screens/app/ReloadSuccess'
import Transfer from './screens/app/Transfer'
import TransferQntd from './screens/app/TransferQntd'
import TransferSuccess from './screens/app/TransferSuccess'
import Use from './screens/app/Use'
import UseResult from './screens/app/UseResult'

const BottomNavig = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Início',
        tabBarIcon: ({tintColor}) => <Icon name="home-variant-outline" size={25} color={tintColor} />
      }
    },
    Card: {
      screen: Card,
      navigationOptions: {
        title: 'Cartão',
        tabBarIcon: ({tintColor}) => <Icon name="card-bulleted-outline" size={25} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#0A84FF',
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Roboto-Medium'
      },
      style: {
        backgroundColor: 'FFF',
      },
    }
  }
)

const AppStack = createStackNavigator(
  {
    BottomNavig: {
      screen: BottomNavig,
    },
    Reload: {
      screen: Reload,
    },
    ReloadSuccess: {
      screen: ReloadSuccess,
    },
    Transfer: {
      screen: Transfer,
    },
    TransferQntd: {
      screen: TransferQntd,
    },
    TransferSuccess: {
      screen: TransferSuccess,
    },
    Use: {
      screen: Use,
    },
    UseResult: {
      screen: UseResult,
    }
  },
  {
    initialRouteName: 'BottomNavig',
    mode: 'modal',
    headerMode: 'none',
  }
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register
    }
  },
  {
    initialRouteName: 'Login',
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
      },
      Login: {
        screen: LoginStack,
      }
    },
    {
      initialRouteName: 'Loading',
    }
);

export default createAppContainer(LoadingSwitch);
