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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width)

const Loading: () => React$Node = () => {
  return (
    <View style={styles.scrollView}>
      <StatusBar backgroundColor="#FF3B30"  barStyle="light-content" />
      <Image source={require('../assets/img/_71832176.png')} style={styles.logoUFSC}/>
      <View style={styles.logoView}>
        <Image source={require('../assets/img/dish.png')} style={styles.logoApp}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, 
    justifyContent: "space-between", 
    alignItems: "flex-start",
    backgroundColor: "#FF3B30",
  },
  logoView: {
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "flex-end",
  },
  logoApp: {
    marginRight: -60,
    marginBottom: -60,
  },
  logoUFSC:{
    marginLeft: 20,
    marginTop: 20,
  },
});

export default Loading;
