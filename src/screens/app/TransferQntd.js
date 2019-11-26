/**
 * UFSC: Cartão RU
 *
 * App criado para a Disciplica de Banco de Dados em 2019-2.
 * 
 * Igor Enrick de Carvalho, 18250348.
 */

import React, { Component } from 'react';
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

import api from '../../services/api'

const qs = require('qs')

const screenWidth = Math.round(Dimensions.get('window').width)

class TransferQntd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      userDestino: '',
      creditos: '',
    };
  }

  confirmTransfer = async () => {
    try {
      const transferencia = {
        usuarioDestino: this.state.userDestino,
        usuarioOrigem: this.state.userOrigem,
        creditos: this.state.creditos
      }

      await api.post('transfers/new', qs.stringify(transferencia)).then(res => {
          this.props.navigation.navigate('TransferSuccess', {userDestino: this.state.userDestino, creditos: this.state.creditos})
      }).catch(error => {
          console.log('Erro: ' + error)
      })
    } catch (_err) {
      console.log(_err)
    }
  }

  render() {
    const { navigation } = this.props;
    this.state.userDestino = navigation.getParam('userDestino', 'NO-USER')
    this.state.userOrigem = navigation.getParam('userOrigem', 'NO-USER')
    return (
      <>
        <StatusBar backgroundColor="#0A84FF"  barStyle="light-content" />
        <View style={styles.scrollView}>

          <Text style={styles.titulo}>Quantos créditos você deseja enviar para {this.state.userDestino.primeironome}?</Text>

          <TextInput
              style={styles.input}
              onChangeText={(creditos) => this.setState({creditos})}
              value={this.state.creditos}
              keyboardType = 'numeric'
              placeholder='Digite aqui.'
              placeholderTextColor="#83C1FF"
          />

          <View>
            <TouchableHighlight style={styles.button} underlayColor={'#83C1FF'} onPress={() => this.props.navigation.navigate('Transfer')}>
              <Text style={styles.text}>{"Cancelar"}</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} underlayColor={'#83C1FF'} onPress={this.confirmTransfer}>
              <Text style={styles.text}>{"Enviar créditos"}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    );
  }
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
