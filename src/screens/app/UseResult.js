/**
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
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const UseResult = ({ navigation }) => {
  return (
    <>
      <StatusBar backgroundColor={true ? "#0A84FF" : "#FF3B30"}  barStyle="light-content" />
      <View style={[styles.scrollView, { backgroundColor: true ? "#0A84FF" : "#FF3B30" }]}>
        <Icon name={true ? "check" : "close"} size={82} color={'#FFF'} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default UseResult;
