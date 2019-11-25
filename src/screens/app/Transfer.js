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
  Text,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  TextInput
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const Transfer = ({ navigation }) => {
  const [matricula, onChangeMatricula] = React.useState('')
  return (
    <>
      <StatusBar backgroundColor="#FFF"  barStyle="dark-content" />
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.enviarView}>
            <Text style={styles.tituloTransferEnviar}>Enviar créditos</Text>

            <View>
              <Text style={styles.tituloCodigoTransferEnviar}>Insira o código de usuário:</Text>

              <TextInput
                  style={styles.input}
                  onChangeText={matricula => onChangeMatricula(matricula)}
                  value={matricula}
                  placeholder={"Matrícula"}
              />

              <TouchableHighlight style={styles.button} underlayColor={'#0972DC'} onPress={() => navigation.navigate('TransferQntd')}>
                <Text style={styles.text}>{"Procurar"}</Text>
              </TouchableHighlight>
            </View>

            <Text style={styles.infoTransferEnviar}>Para enviar para outra pessoa, solicite o código (mátricula) de usuário dela e informe no campo acima. </Text>
          </View>

          <View style={styles.receberView}>
            <Text style={styles.tituloTransferReceber}>Receber créditos</Text>

            <View>
              <Text style={styles.tituloCodigoTransferReceber}>Meu código de usuário:</Text>
              <Text style={styles.codigoTransferReceber}>18250348</Text>
            </View>

            <Text style={styles.infoTransferReceber}>Para receber de outra pessoa, informe o seu código (matrícula) para o usuário que irá te enviar os créditos. </Text>
          </View>
          
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#0A84FF',
    flex: 1,
    alignItems: 'center'
  },
  enviarView: {
    backgroundColor: '#fff',
    width: screenWidth,
    minHeight: screenHeight/2,
    maxHeight: (screenHeight/10)*6,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  receberView: {
    paddingTop: 20,
    flex: 1,
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  tituloTransferEnviar: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#000',
    textAlign: 'center'
  },
  tituloTransferReceber: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  infoTransferEnviar: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    color: '#000',
    marginHorizontal: 20,
    textAlign: 'center'
  },
  infoTransferReceber: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 20,
    textAlign: 'center'
  },
  tituloCodigoTransferReceber: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 20,
    textAlign: 'center'
  },
  tituloCodigoTransferEnviar: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#000',
    marginHorizontal: 20,
    textAlign: 'center'
  },
  codigoTransferReceber: {
    fontFamily: 'Roboto-Light',
    fontSize: 34,
    color: '#fff',
    marginHorizontal: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#E5E5EA',
    width: screenWidth-80,
    borderRadius: 5,
    fontFamily: 'Roboto-Medium',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#0A84FF',
    width: screenWidth-80,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
});

export default Transfer;
