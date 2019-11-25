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
  TouchableHighlight,
  Switch
} from 'react-native';

import { StackActions } from 'react-navigation'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'
const qs = require('qs')


const screenWidth = Math.round(Dimensions.get('window').width)

const Register = ({ navigation }) => {
    const [matricula, onChangeMatricula] = React.useState('')
    const [primeironome, onChangePrimeiroNome] = React.useState('')
    const [segundonome, onChangeSegundoNome] = React.useState('')
    const [curso, onChangeCurso] = React.useState('')
    const [senha, onChangeSenha] = React.useState('')
    const [isento, onChangeIsento] = React.useState(false)
    const [error, onChangeError] = React.useState('')
    const [mensagem, onChangeMensagem] = React.useState(false)

    handleRegisterPress = async () => {      
        if (curso === '' || segundonome === '' || primeironome === '' || senha === '' || matricula === '') {
            onChangeError('Preencha ambos os campos antes de entrar.')
            onChangeMensagem(true)
        } else {
            try {
                onChangeMensagem(false)

                const user = {
                  primeironome: primeironome,
                  segundonome: segundonome,
                  curso: curso,
                  senha: senha,
                  matricula: matricula,
                  isento: isento
                }

                await api.post('/users/register', qs.stringify(user)).then(resp => {
                        console.log('Registro realizado.')
                    }).catch(error => {
                        console.log('Erro: ' + error)
                })

                navigation.navigate('Login')
            } catch (_err) {
                onChangeError('Matrícula ou senha inválidos. Tente novamente.')
                onChangeMensagem(true)
            }
        }
    }

    return (
        <View style={styles.scrollView}>
            <StatusBar backgroundColor="#FFF"  barStyle="dark-content" />
            <Text style={styles.saudacao}>Informe os seguinte dados:</Text>

            {mensagem ? <Text style={styles.erro}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                onChangeText={matricula => onChangeMatricula(matricula)}
                value={matricula}
                placeholder={"Matrícula"}
                keyboardType = 'numeric'
            />
            <TextInput
                style={styles.input}
                onChangeText={primeironome => onChangePrimeiroNome(primeironome)}
                value={primeironome}
                placeholder={"Nome"}
            />
            <TextInput
                style={styles.input}
                onChangeText={segundonome => onChangeSegundoNome(segundonome)}
                value={segundonome}
                placeholder={"Sobrenome"}
            />
            <TextInput
                style={styles.input}
                onChangeText={curso => onChangeCurso(curso)}
                value={curso}
                placeholder={"Curso"}
            />
            <TextInput
                style={styles.input}
                onChangeText={senha => onChangeSenha(senha)}
                value={senha}
                placeholder={"Senha"}
                secureTextEntry={true}
            />

            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <Text style={styles.rtxtb}>Não isento</Text>
              <Switch
                  style={styles.switch}
                  onValueChange={isento => onChangeIsento(isento)}
                  value={isento}
                  thumbColor={'#0A84FF'}
              />
              <Text style={styles.rtxtb}>Isento</Text>
            </View>

            <TouchableHighlight style={styles.button} underlayColor={'#0972DC'} onPress={() => handleRegisterPress()}>
                <Text style={styles.text}>{"Registrar"}</Text>
            </TouchableHighlight>

            <View style={styles.viewr}>
                <Text style={styles.rtxtr}>Já possui uma conta? </Text>
                <Text style={styles.rtxtb} onPress={()=> navigation.navigate('Login')}>Entrar.</Text>
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
  switch: {
    marginHorizontal: 20,
    marginVertical: 10
  }
});

export default Register;
