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

const qs = require('qs')

import api from '../../services/api'

const screenWidth = Math.round(Dimensions.get('window').width)

class Reload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditos: '',
      dono: ''
    };
  }

  recargaCreditos = async () => {
    try {
      if (this.state.creditos != '') {
        const user = {
          dono: this.state.dono, 
          creditos: this.state.creditos
        }
        await api.post('reloads/new', qs.stringify(user)).then(resp => {
                console.log('Recarga realizada.')
            }).catch(error => {
                console.log('Erro: ' + error)
        })
      }

      this.props.navigation.navigate('ReloadSuccess', { creditos: this.state.creditos })
    } catch (_err) {
      console.log(_err)
    }
  }

  render() {
    const { navigation } = this.props;
    this.state.dono = navigation.getParam('_idDono', 'NO-ID')
    return (
      <>
        <StatusBar backgroundColor="#0A84FF"  barStyle="light-content" />
        <View style={styles.scrollView}>

          <Text style={styles.titulo}>Quantos créditos você deseja carregar?</Text>

          <TextInput
              style={styles.input}
              onChangeText={(creditos) => this.setState({creditos})}
              value={this.state.creditos}
              keyboardType = 'numeric'
              placeholder='Digite aqui.'
              placeholderTextColor="#83C1FF"
          />

          <TouchableHighlight style={styles.button} underlayColor={'#83C1FF'} onPress={this.recargaCreditos}>
            <Text style={styles.text}>{"Carregar"}</Text>
          </TouchableHighlight>
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

export default Reload;
