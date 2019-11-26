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
  TouchableHighlight
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../services/api'

const screenWidth = Math.round(Dimensions.get('window').width)

class Card extends Component {
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
    
    await api.get('users/me').then(res => {
        
        this.setState({ user: res.data })
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
              <TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.navigation.navigate('Use')}>
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

              <Text style={{fontFamily: 'Roboto-Italic', textAlign: 'center', color: '#8E8E93', marginTop: 10}}>{'Você ainda não possui nenhuma\natividade para mostrar.'}</Text>
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
    alignItems: 'center',
    marginTop: 10
  },
  tituloAtividade: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#000'
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
