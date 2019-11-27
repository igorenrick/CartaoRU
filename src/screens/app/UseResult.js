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
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class UseResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valido: false
    };
  }
  render() {
    const { navigation } = this.props;
    this.state.valido = navigation.getParam('valido', false)
    return (
      <TouchableHighlight style={ {flex: 1, justifyContent: 'center', backgroundColor: this.state.valido ? "#0A84FF" : "#FF3B30"} } underlayColor={"#AEAEB2"} onPress={() => this.props.navigation.navigate('Card')}>
        <View>
          <StatusBar backgroundColor={this.state.valido ? "#0A84FF" : "#FF3B30"}  barStyle="light-content" />
          <View style={[styles.scrollView, { backgroundColor: this.state.valido ? "#0A84FF" : "#FF3B30" }]}>
            <Icon name={this.state.valido ? "check" : "close"} size={82} color={'#FFF'} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default UseResult;
