/**
 * UFSC: Cartão RU
 *
 * App criado para a Disciplica de Banco de Dados em 2019-2.
 * 
 * Igor Enrick de Carvalho, 18250348.
 *//**
 * UFSC: Cartão RU
 *
 * App criado para a Disciplica de Banco de Dados em 2019-2.
 * 
 * Igor Enrick de Carvalho, 18250348.
 */

import React from 'react';

import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Image,
  Text
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width)

class Loading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {

    AsyncStorage.clear()

    const userToken = await AsyncStorage.getItem('userToken');

    this.props.navigation.navigate(userToken ? 'App' : 'Login');
  };
  render() {
    return (
      <View style={styles.scrollView}>
        <StatusBar backgroundColor="#0A84FF"  barStyle="light-content" />
        <Image source={require('../assets/img/ufsc.png')} style={styles.logoUFSC}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#0A84FF",
  },
  logoUFSC:{
    height: 32,
    width: 120
  },
});

export default Loading;
