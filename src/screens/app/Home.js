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
  Dimensions,
  TouchableHighlight
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../services/api'

const screenWidth = Math.round(Dimensions.get('window').width)

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }

  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem('userToken')

    const token = userToken.replace(/"/g, '')
    
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token

    console.log('userToken: ' + userToken)
    
    await api.get('users/me').then(res => {

        console.log('Data: ' + res.data)
        
        this.setState({ user: res.data })
    }).catch(error => {
        console.log('Error: ' + error)
    })
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#FFF"  barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.headerView}>
              <Icon name="account-circle-outline" size={32} color={'#0A84FF'} />
              <Text style={styles.nome}>{this.state.user.primeironome}</Text>
            </View>

            <View style={styles.dadosView}>
              <View style={styles.dadosInfoView}>
                <Text style={styles.dadosTitulo}>Seus Créditos</Text>
                <Text style={styles.dadosValor}>{this.state.user.creditos}</Text>
              </View>

              <View style={styles.dadosInfoView}>
                <Text style={styles.dadosTitulo}>Categoria</Text>
                <Text style={styles.dadosValor}>{this.state.user.isento ? 'Isento' : 'Não isento'}</Text>
              </View>
            </View>

            <View style={styles.botoesView}>
              <TouchableHighlight style={styles.button} underlayColor={'#D1D1D6'} onPress={()=> navigation.navigate('Transfer')}>
                <View style={{alignItems: 'center'}}>
                  <Icon name="swap-horizontal" size={44} color={'#000'} />
                  <Text style={styles.text}>{"Transferir"}</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight style={styles.button} underlayColor={'#D1D1D6'} onPress={()=> navigation.navigate('Reload')}>
                <View style={{alignItems: 'center'}}>
                  <Icon name="plus-box-outline" size={42} color={'#000'} />
                  <Text style={styles.text}>{"Recarregar"}</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.cardapioView}>
              <Text style={styles.tituloCardapio}>Cardápio do Dia</Text>

              <Text style={styles.tituloCategoriaCardapio}>ALMOÇO</Text>
              <Text style={styles.conteudoCategoriaCardapio}>Alfaceo, Tomate, Arroz, Arroz integral, Feijão, Grão de Bico, Macarrão, Carne de Panela, Frango, Gelatina de Morango.</Text>

              <Text style={styles.tituloCategoriaCardapio}>JANTA</Text>
              <Text style={styles.conteudoCategoriaCardapio}>Alfaceo, Tomate, Arroz, Arroz integral, Feijão, Grão de Bico, Macarrão, Carne de Panela, Frango, Gelatina de Morango.</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  headerView: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nome: {
    fontFamily: 'Roboto-Bold',
    color: '#0A84FF',
    fontSize: 18,
    marginLeft: 5
  },
  dadosView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
    marginLeft: 30
  },
  dadosInfoView: {
    //width: (screenWidth-40)/2,
  },
  dadosTitulo: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#8E8E93',
    marginTop: 15
  },
  dadosValor: {
    fontFamily: 'Roboto-Light',
    fontSize: 32,
    color: '#000'
  },
  botoesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 25
  },
  button: {
    width: (screenWidth-60)/2,
    height: 100,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#000',
    marginTop: 10
  },
  cardapioView: {
    alignItems: 'center',
    marginTop: 50
  },
  tituloCardapio: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#000'
  },
  tituloCategoriaCardapio: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#0A84FF',
    marginTop: 20
  },
  conteudoCategoriaCardapio: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
    marginHorizontal: 30
  }
});

export default Home;
