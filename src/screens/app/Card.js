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
  Image,
  TouchableHighlight,
  FlatList
} from 'react-native';

const qs = require('qs')
const moment = require('moment')

import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../services/api'

const screenWidth = Math.round(Dimensions.get('window').width)

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      tematividade: true,
      usos: '',
      localUsos: '',
      recargas: '',
      transferencias: '',
      i: 0,
      nomest: [
        {
          nome: 'Nenhum'
        },
        {
          nome: 'Nenhum'
        },
        {
          nome: 'Nenhum'
        }
      ]
    };
  }

  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem('userToken')

    const token = userToken.replace(/"/g, '')
    
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token
    
    await api.get('users/me').then(res => {
        this.setState({ user: res.data })
    }).catch(error => {
        console.log('Error: ' + error)
    })

    //PEGA USOS
    const requestBodyUsos = {
      _id: this.state.user.atividade,
    }

    await api.post('activities/listuses', qs.stringify(requestBodyUsos)).then(res => {      
      console.log('Usos: ' + res.data)
      
      this.setState({ usos: res.data })
    }).catch(error => {
        console.log('Error: ' + error)
    })

    const requestIdRestaurante = {
      _id: this.state.usos[0].local,
    }
    await api.post('restaurants/find', qs.stringify(requestIdRestaurante)).then(res => {      
      console.log('Restaurante: ' + res.data.nome)        
      this.setState({ localUsos: res.data.nome })
    }).catch(error => {
        console.log('Error: ' + error)
    })

    //PEGA RECARGAS

    const requestBodyRecargas = {
      _id: this.state.user.atividade,
    }

    await api.post('activities/listreloads', qs.stringify(requestBodyRecargas)).then(res => {      
      console.log('Recargas: ' + res.data)        
      this.setState({ recargas: res.data })
    }).catch(error => {
        console.log('Error: ' + error)
    })

    //PEGA TRANSFERENCIAS

    const requestBodyTransferencias = {
      _id: this.state.user.atividade,
    }

    await api.post('activities/listtransfers', qs.stringify(requestBodyTransferencias)).then(res => {      
      console.log('Transferências: ' + res.data)        
      this.setState({ transferencias: res.data })
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

  render() {
    return (
      <>
        <StatusBar backgroundColor="#FFF"  barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.maxheaderView}>
              <View style={styles.headerView}>
                <Icon name="account-circle-outline" size={32} color={'#0A84FF'} />
                <Text style={styles.nome}>{this.state.user.primeironome}</Text>
              </View>
              <TouchableHighlight style={styles.buttonheader} underlayColor={'#83C1FF'} onPress={this.handleSignOutPress}>
                <Text style={styles.textheader}>{"Sair"}</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.cartaoView}>
              <TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.navigation.navigate('Use', { user: this.state.user })}>
                <View style={styles.cartao}>
                  <Image source={require('../../assets/img/ufsc.png')} style={styles.logoUFSC}/>

                  <View>
                    <Text style={styles.nomeCartao}>{this.state.user.primeironome + ' ' + this.state.user.segundonome}</Text>
                    <Text style={styles.cursoCartao}>{this.state.user.curso}</Text>
                    <Text style={styles.matriculaCartao}>{this.state.user.matricula}</Text>
                  </View>
                </View>
              </TouchableHighlight>

              <Text style={{fontFamily: 'Roboto-Italic', textAlign: 'center', color: '#8E8E93', marginTop: 10}}>{'Toque no cartão para usá-lo.'}</Text>
            </View>

            <View style={styles.atividadeView}>
              <Text style={styles.tituloAtividade}>Últimas Atividades</Text>

              {this.state.tematividade ? null : <Text style={{fontFamily: 'Roboto-Italic', textAlign: 'center', color: '#8E8E93', marginTop: 10}}>{'Você ainda não possui nenhuma\natividade para mostrar.'}</Text>}
              
              <Text style={styles.titulo2Atividade}>Usos</Text>
              
              <FlatList 
                data={this.state.usos}
                renderItem={({ item }) => (
                  <View style={{marginHorizontal: 20, marginTop: 5, marginBottom: 5}}>
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#8E8E93'}}>{moment(item.data).subtract(10, 'days').calendar()}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text>Uso no {this.state.localUsos}</Text>
                      <Text>{item.creditos > 1 ? item.creditos + ' créditos' : item.creditos + ' crédito'}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item._id}
              /> 

              <Text style={styles.titulo2Atividade}>Recargas</Text>

              <FlatList 
                data={this.state.recargas}
                renderItem={({ item }) => (
                  <View style={{marginHorizontal: 20, marginTop: 5, marginBottom: 5}}>
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#8E8E93'}}>{moment(item.data).subtract(10, 'days').calendar()}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text>Recarga</Text>
                      <Text>{item.creditos > 1 ? item.creditos + ' créditos' : item.creditos + ' crédito'}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />

              <Text style={styles.titulo2Atividade}>Transferências</Text>

              <FlatList 
                data={this.state.transferencias}
                renderItem={({ item }) => (
                  <View style={{marginHorizontal: 20, marginTop: 5, marginBottom: 5}}>
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#8E8E93'}}>{moment(item.data).subtract(10, 'days').calendar()}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text>Transferência para usuário</Text>
                      <Text>{item.creditos > 1 ? item.creditos + ' créditos' : item.creditos + ' crédito'}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
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
  cartaoView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 25,
    paddingBottom: 25
  },
  cartao: {
    justifyContent: 'space-between',
    backgroundColor: '#0A84FF',
    height: 409.57,
    width: 285,
    borderRadius: 10,
    borderColor: '#0972DC',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 3,
    padding: 20
  },
  logoUFSC: {
    height: 25,
    width: 90
  },
  atividadeView: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40
  },
  tituloAtividade: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    alignSelf: 'center',
    color: '#000'
  },
  titulo2Atividade: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    alignSelf: 'center',
    color: '#000',
    marginTop: 15
  },
  nomeCartao: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
    textTransform: 'uppercase'
  },
  cursoCartao: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3,
  },
  matriculaCartao: {
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 3,
  }
});

export default Card;
