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
  RefreshControl,
  TextInput
} from 'react-native'

const qs = require('qs')

import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../services/api'

const screenWidth = Math.round(Dimensions.get('window').width)

class Perfil extends Component {
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
        res.data.senha = '000000'
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
              <View style={{flexDirection: 'row', justifyContent:'center', marginVertical: 50}}>
                <Icon name="account-circle-outline" size={32} color={'#0A84FF'} />
                <Text style={styles.nome}>{this.state.user.primeironome}</Text>
              </View>
              <Text style={styles.tituloCardapio}>Alterar dados</Text>
              <View style={styles.view}>
                <TextInput
                  style={styles.input}
                  onChangeText={(matricula) => this.setState({user: { matricula }})}
                  value={this.state.user.matricula}
                  placeholder={"Matrícula"}
                />

                <TextInput
                  style={styles.input}
                  onChangeText={(primeironome) => this.setState({user: { primeironome }})}
                  value={this.state.user.primeironome}
                  placeholder={"Nome"}
                />

                <TextInput
                  style={styles.input}
                  onChangeText={(segundonome) => this.setState({user: { segundonome }})}
                  value={this.state.user.segundonome}
                  placeholder={"Sobrenome"}
                />

                <TextInput
                  style={styles.input}
                  onChangeText={(senha) => this.setState({user: { senha }})}
                  value={this.state.user.senha}
                  placeholder={"Senha"}
                  secureTextEntry={true}
                />

                <TouchableHighlight style={styles.button} underlayColor={'#0972DC'} onPress={ () => null }>
                  <Icon name="checkbox-marked-circle-outline" size={24} color={'#FFF'} />
                </TouchableHighlight>
              </View>

              <View style={[styles.view, { marginTop: 50}]}>
                <Text style={[styles.tituloCardapio, {marginBottom: 5}]}>Outras ações</Text>
                <TouchableHighlight style={styles.buttondelete} underlayColor={'#0972DC'} onPress={ () => null }>
                  <Text style={styles.text}>{"Deletar conta"}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} underlayColor={'#0972DC'} onPress={this.handleSignOutPress}>
                  <Text style={styles.text}>{"Sair"}</Text>
                </TouchableHighlight>
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
  input: {
    backgroundColor: '#E5E5EA',
    width: screenWidth-40,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: 'Roboto-Medium',
    color: '#000',
    textAlign: 'center',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: 15,
    height: 50,
    borderRadius: 5,
    width: screenWidth-40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttondelete: {
    backgroundColor: '#FF3B30',
    padding: 15,
    height: 50,
    borderRadius: 5,
    width: screenWidth-40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  view: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5
  },
  tituloCardapio: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#000',
    alignSelf: 'center'
  },
  nome: {
    fontFamily: 'Roboto-Bold',
    color: '#0A84FF',
    fontSize: 18,
    marginLeft: 5
  },
});

export default Perfil;
