/**
 * UFSC: Cartão RU
 *
 * App criado para a Disciplica de Banco de Dados em 2019-2.
 * 
 * Igor Enrick de Carvalho, 18250348.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Text,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import QRCodeScanner from 'react-native-qrcode-scanner'

import api from '../../services/api'

const qs = require('qs')

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

class Use extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultado: 'RESULTADO LEITURA',
      cartao: '',
      user: '',
      restaurante: ''
    };
  }

  componentDidMount = async () => {
    
    //ACESSA CARTÃO
    const requestBodyCard = {
      _id: this.state.user.cartao,
    }

    await api.post('cards/access', qs.stringify(requestBodyCard)).then(res => {
        
        console.log('Créditos: ' + res.data.creditos )
        
        this.setState({ cartao: res.data })

    }).catch(error => {
        console.log('Error: ' + error)
    })
  }
  
  onSuccess = async (resultado) => {
    this.setState({resultado: resultado.data})

    //VERIFICA SE O USER TEM CREDITO
    if(this.state.cartao.creditos > 0 || this.state.user.isento ) {
      //SE O USUÁRIO TEM CREDITO, PASSA TRUE 
      console.log('NO IF - Creditos: ' + this.state.cartao.creditos)

      //ACESSA RESTAURANTE, ADICIONA USO
      const requestBodyRestaurante = {
        dono: this.state.user._id,
        local: resultado.data
      }
      
      await api.post('uses/new', qs.stringify(requestBodyRestaurante)).then(res => {
            
          console.log('Restaurante: ' + res.data.dono )
          this.setState({ restaurante: res.data })

      }).catch(error => {
          console.log(error)
      })

      this.props.navigation.navigate('UseResult', {valido: true})

    } else {
      //SENÃO PASSA FALSE
      console.log('NO ELSE - Creditos: ' + this.state.cartao.creditos)
      this.props.navigation.navigate('UseResult', {valido: false})
    }
  }
  render() {
    const { navigation } = this.props;
    this.state.user = navigation.getParam('user', 'NO-USER')
    return (
      <>
        <StatusBar backgroundColor="#000"  barStyle="light-content" />
        <View style={styles.scrollView}>
          <QRCodeScanner
              onRead={(uso) => this.onSuccess(uso)}
              showMarker={true}
              //cameraStyle={{height: screenHeight}}
              topContent={
                  <View style={styles.headerView}>
                      <Icon name="account-circle-outline" size={32} color={'#0A84FF'} />
                      <Text style={styles.nome}>{this.state.user.primeironome}</Text>
                  </View>
              }
              bottomContent={
                  <Text style={styles.desc}>{'Aproxime do Código QR no\nrestaurante para utilizar o cartão.'}</Text>
              }
          />
        </View>
      </>
    );
  }
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

export default Use;
