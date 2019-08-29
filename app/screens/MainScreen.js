import React, { Component } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles';

class HomeScreen extends Component {

  render() {
    return(
      <LinearGradient colors={['#32799D', '#85C2E2']} style={styles.backdrop}>
        <SafeAreaView style={[styles.safeView]}>
          <View style={styles.secSlider}>
            <TouchableOpacity style={styles.secSliderArrowButton}>
              <View style={[styles.makeTriangle('left', '10', 'white')]} />
            </TouchableOpacity>
            <View style={[styles.secSliderStage, {height: this.props.stageHeight}]} onLayout={(event) => this.props.setStageHeight(event)}>
              <Image style={styles.secSliderImage} source={{uri: this.props.stageSprite}}/>
            </View>
            <TouchableOpacity style={styles.secSliderArrowButton}>
              <View style={[styles.makeTriangle('right', '10', 'white')]} />
            </TouchableOpacity>
          </View>
          <View style={styles.secPokeList}>
            <View style={styles.secPokeListItem}>
              <Image style={{height: 50, width: 50}} source={{uri: this.props.stageSprite}}/>
              <Text style={{flex: 1}}>Name</Text>
              <View style={{paddingRight: 20}}>
                <View style={[styles.makeTriangle('right', '10', 'black')]} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => {
  return {stageSprite: state.mainReducer.stageSprite, stageHeight: state.mainReducer.stageHeight};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStageHeight: (event) => {
      dispatch({ type: 'SET_STAGE_HEIGHT', payload: event.nativeEvent.layout.width})
    }
  }
};

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const AppNavigator = createSwitchNavigator({
  HomeScreen: {
    screen: HomeScreenContainer
  }
}, {
  initialRouteName: "HomeScreen"
});

export default createAppContainer(AppNavigator);
