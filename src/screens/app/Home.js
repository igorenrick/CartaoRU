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
  TouchableHighlight,
  RefreshControl
} from 'react-native'

const qs = require('qs')

import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../services/api'

const screenWidth = Math.round(Dimensions.get('window').width)

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      user: '',
      cartao: '',
      cardapio: '',
      erro: false,
      mensagem: ''
    };
  }

  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem('userToken')

    const token = userToken.replace(/"/g, '')
    
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token

    console.log('userToken: ' + userToken)
    
    await api.get('users/me').then(res => {

        console.log('Data: ' + res.data.cartao)
        
        this.setState({ user: res.data })
    }).catch(error => {
        console.log('Error: ' + error)
    })

    const requestBodyCard = {
      _id: this.state.user.cartao,
    }

    await api.post('cards/access', qs.stringify(requestBodyCard)).then(res => {
        
        console.log('Créditos: ' + res.data.creditos )
        
        this.setState({ cartao: res.data })

    }).catch(error => {
        console.log('Error: ' + error)
    })

    console.log('BUSCA MENUS DE ALMOÇO E JANTA')

    const requestBodyMenu = {
      local: '5ddc60a2154f630004c30fa7',
    }

    await api.post('menus/find', qs.stringify(requestBodyMenu)).then(res => {      
      console.log('Almoço: ' + res.data.almoco)        
      this.setState({ cardapio: res.data })
    }).catch(error => {
        console.log('Error: ' + error)
    })

  }

  handleSignOutPress = async () => {    
      try {
          console.log('Botão pressionado.')

          const userToken = await AsyncStorage.getItem('userToken')

          AsyncStorage.removeItem('userToken')
          
          const token = userToken.replace(/"/g, '')

          console.log('User token: ' + token)

          api.defaults.headers.common['Authorization'] = 'Bearer ' + token
          
          api.post('/users/me/logout').then(resp => {
                  console.log('Logout realizado.')
              }).catch(error => {
                  console.log(error)
          })

          this.props.navigation.navigate('Login')

      } catch (_err) {
          this.setState({ error: 'Houve um problema com o logout, tente novamente.' });
      }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#FFF"  barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            >
            <View style={styles.maxheaderView}>
              <View style={styles.headerView}>
                <Icon name="account-circle-outline" size={32} color={'#0A84FF'} />
                <Text style={styles.nome}>{this.state.user.primeironome}</Text>
              </View>
              <View></View>
              {/*<TouchableHighlight style={styles.buttonheader} underlayColor={'#83C1FF'} onPress={this.handleSignOutPress}>
                <Text style={styles.textheader}>{"Sair"}</Text>
              </TouchableHighlight>*/}
            </View>

            <View style={styles.dadosView}>
              <View style={styles.dadosInfoView}>
                <Text style={styles.dadosTitulo}>Seus Créditos</Text>
                <Text style={styles.dadosValor}>{this.state.cartao.creditos}</Text>
              </View>

              <View style={styles.dadosInfoView}>
                <Text style={styles.dadosTitulo}>Categoria</Text>
                <Text style={styles.dadosValor}>{this.state.user.isento ? 'Isento' : 'Não isento'}</Text>
              </View>
            </View>

            <View style={{marginTop: 25}}>
              {this.state.erro ? <Text style={styles.erro}>{this.state.mensagem}</Text> : null}
              <View style={styles.botoesView}>
                <TouchableHighlight style={styles.button} underlayColor={'#D1D1D6'} onPress={() => this.state.user.isento ? this.setState({ mensagem: 'Usuários isentos não podem transferir créditos.', erro: true}) : this.props.navigation.navigate('Transfer', { user: this.state.user})}>
                  <View style={{alignItems: 'center'}}>
                    <Icon name="swap-horizontal" size={44} color={this.state.user.isento ? '#AEAEB2' :'#000'} />
                    <Text style={[styles.text, {color: this.state.user.isento ? '#AEAEB2' : '#000' }]}>{"Transferir"}</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button} underlayColor={'#D1D1D6'} onPress={() => this.state.user.isento ? this.setState({ mensagem: 'Usuários isentos não podem recarregar créditos.', erro: true}) : this.props.navigation.navigate('Reload', { _idDono: this.state.user._id})}>
                  <View style={{alignItems: 'center'}}>
                    <Icon name="plus-box-outline" size={42} color={this.state.user.isento ? '#AEAEB2' : '#000'} />
                    <Text style={[styles.text, {color: this.state.user.isento ? '#AEAEB2' : '#000' }]}>{"Recarregar"}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View style={styles.cardapioView}>
              <Text style={styles.tituloCardapio}>Cardápio do Dia</Text>

              <Text style={styles.tituloCategoriaCardapio}>ALMOÇO</Text>
              <Text style={styles.conteudoCategoriaCardapio}>{this.state.cardapio.almoco == undefined ? 'Cardápio do almoco não disponível.' : this.state.cardapio.almoco}</Text>

              <Text style={styles.tituloCategoriaCardapio}>JANTA</Text>
              <Text style={styles.conteudoCategoriaCardapio}>{this.state.cardapio.janta == undefined ? 'Cardápio da janta não disponível.' : this.state.cardapio.janta}</Text>
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
  buttonheader: {
    backgroundColor: '#FFF',
    borderColor: '#0A84FF',
    borderWidth: 2,
    padding: 7,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  erro: {
    color: '#FF453A',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    alignSelf: 'center'
  },
  textheader: {
    color: '#0A84FF',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  maxheaderView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    marginTop: 5
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
