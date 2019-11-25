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

const TransferQntd = ({ navigation }) => {
  const [creditos, onChangeCreditos] = React.useState('')

  return (
    <>
      <StatusBar backgroundColor="#0A84FF"  barStyle="light-content" />
      <View style={styles.scrollView}>

        <Text style={styles.titulo}>Quantos créditos você deseja enviar para Ricardo?</Text>

        <TextInput
            style={styles.input}
            onChangeText={creditos => onChangeCreditos(creditos)}
            value={creditos}
            keyboardType = 'numeric'
            placeholder='Digite aqui.'
            placeholderTextColor="#83C1FF"
        />

        <View>
          <TouchableHighlight style={styles.button} underlayColor={'#83C1FF'} onPress={() => navigation.navigate('Transfer')}>
            <Text style={styles.text}>{"Cancelar"}</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} underlayColor={'#83C1FF'} onPress={() => navigation.navigate('ReloadSuccess')}>
            <Text style={styles.text}>{"Enviar créditos"}</Text>
          </TouchableHighlight>
        </View>
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

export default TransferQntd;
