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
  Dimensions,
  Text,
  TouchableHighlight
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width)

const UseResult = ({ navigation }) => {
  return (
    <>
      <StatusBar backgroundColor="#0A84FF"  barStyle="light-content" />
      <View style={styles.scrollView}>
        <TouchableHighlight style={styles.button} underlayColor={'#0972DC'} onPress={() => navigation.navigate('UseResult')}>
            <Text style={styles.text}>{"USE RESULT"}</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#0A84FF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default UseResult;
