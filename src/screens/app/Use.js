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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import QRCodeScanner from 'react-native-qrcode-scanner';

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const UseResult = ({ navigation }) => {
  onSuccess = (e) => {
    navigation.navigate('UseResult')
  }
  return (
    <>
      <StatusBar backgroundColor="#000"  barStyle="light-content" />
      <View style={styles.scrollView}>
        <QRCodeScanner
            onRead={() => onSuccess()}
            showMarker={true}
            //cameraStyle={{height: screenHeight}}
            topContent={
                <View style={styles.headerView}>
                    <Icon name="account-circle-outline" size={32} color={'#0A84FF'} />
                    <Text style={styles.nome}>Igor Enrick</Text>
                </View>
            }
            bottomContent={
                <Text style={styles.desc}>{'Aproxime do Código QR no\nrestaurante para utilizar o cartão.'}</Text>
            }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerView: {
    flexDirection: 'row',
    marginTop: -40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nome: {
    fontFamily: 'Roboto-Bold',
    color: '#0A84FF',
    fontSize: 18,
    marginLeft: 5
  },
  desc: {
      marginHorizontal: 40,
      color: '#fff',
      fontFamily: 'Roboto-Italic',
      textAlign: 'center'
  }
});

export default UseResult;
