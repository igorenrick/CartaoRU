/**
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
  TextInput,
  TouchableHighlight,
  Dimensions
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width)

const TransferSuccess = ({ navigation }) => {
  const [creditos, onChangeCreditos] = React.useState('')

  return (
    <>
      <StatusBar backgroundColor="#0A84FF"  barStyle="light-content" />
      <View style={styles.scrollView}>

        <Text style={styles.titulo}>Pronto!</Text>

        <Text style={styles.input}>Você enviou 20 créditos para Ricardo.</Text>

        <TouchableHighlight style={styles.button} underlayColor={'#83C1FF'} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.text}>{"Fechar."}</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#0A84FF',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20
  },
  titulo: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 18
  },
  input:{
    color: '#fff',
    fontFamily: 'Roboto-Light',
    fontSize: 32,
  },
  button: {
    backgroundColor: '#FFF',
    width: screenWidth-40,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#0A84FF',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
});

export default TransferSuccess;
