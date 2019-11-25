/**
 * UFSC: Cartão RU
 *
 * App criado para a Disciplica de Banco de Dados em 2019-2.
 * 
 * Igor Enrick de Carvalho, 18250348.
 *//**
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
  StatusBar,
  Dimensions,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { StackActions } from 'react-navigation'

import AsyncStorage from '@react-native-community/async-storage'

const screenWidth = Math.round(Dimensions.get('window').width)

const Login = ({ navigation }) => {
    const [nome, onChangeNome] = React.useState('')
    const [senha, onChangeSenha] = React.useState('')
    const [error, onChangeError] = React.useState('')
    const [mensagem, onChangeMensagem] = React.useState(false)

    handleSignInPress = () => {      
        if (nome === '' || senha === '') {
            onChangeError('Preencha ambos os campos antes de entrar.')
            onChangeMensagem(true)
        } else {
            try {
                onChangeMensagem(false)

                AsyncStorage.setItem('userToken', JSON.stringify(true))
                
                const resetAction = StackActions.reset({
                    index: 0
                })

                navigation.navigate('App')
            } catch (_err) {
                onChangeError('Matrícula ou senha inválidos. Tente novamente.')
                onChangeMensagem(true)
            }
        }
    }

    return (
        <View style={styles.scrollView}>
            <StatusBar backgroundColor="#FFF"  barStyle="dark-content" />
            <Text style={styles.saudacao}>Bem-vindo!</Text>

            {mensagem ? <Text style={styles.erro}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                onChangeText={nome => onChangeNome(nome)}
                value={nome}
                placeholder={"Matricula"}
            />
            <TextInput
                style={styles.input}
                onChangeText={senha => onChangeSenha(senha)}
                value={senha}
                placeholder={"Senha"}
                secureTextEntry={true}
            />

            <TouchableHighlight style={styles.button} underlayColor={'#0972DC'} onPress={() => handleSignInPress()}>
                <Text style={styles.text}>{"Entrar"}</Text>
            </TouchableHighlight>

            <View style={styles.viewr}>
                <Text style={styles.rtxtr}>Não tem uma conta? </Text>
                <Text style={styles.rtxtb} onPress={()=> navigation.navigate('Register')}>Cadastre-se.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  saudacao: {
      color: '#000',
      fontFamily: 'Roboto-Bold',
      fontSize: 18,
      marginBottom: 15
  },
  input: {
      backgroundColor: '#E5E5EA',
      width: screenWidth-80,
      borderRadius: 5,
      fontFamily: 'Roboto-Medium',
      color: '#000',
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5
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
  erro: {
    color: '#FF453A',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  viewr: {
    flexDirection: 'row',
    marginTop: 10,
  },
  rtxtr: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  rtxtb: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    color: '#000',
  },
});

export default Login;
