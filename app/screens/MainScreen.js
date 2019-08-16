import React, { Component, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stageHeight: 0
    }
  }

  makeStageSquare = (event) => {
    this.setState({
      stageHeight: event.nativeEvent.layout.width
    })
  };

  render() {
    return(
        <LinearGradient colors={['#32799D', '#85C2E2']} style={styles.backdrop}>
          <SafeAreaView style={[styles.safeView]}>
            <View style={styles.secSlider}>
              <TouchableOpacity style={styles.secSliderArrowButton}>
                <View style={[styles.makeTriangle('left', '10', 'white')]} />
              </TouchableOpacity>
              <View style={[styles.secSliderStage, {height: this.state.stageHeight}]} onLayout={(event) => this.makeStageSquare(event)}>

              </View>
              <TouchableOpacity style={styles.secSliderArrowButton}>
                <View style={[styles.makeTriangle('right', '10', 'white')]} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
    )
  }
}

const AppNavigator = createSwitchNavigator({
  HomeScreen: {
    screen: HomeScreen
  }
}, {
  initialRouteName: "HomeScreen"
});

export default createAppContainer(AppNavigator);
