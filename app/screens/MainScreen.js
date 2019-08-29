import React, { Component } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles';
import * as ActionCreators from '../actions'

class HomeScreen extends Component {

  componentWillMount() {
    this.props.getPokemonList();
  }

  render() {
    return(
      <LinearGradient colors={['#32799D', '#85C2E2']} style={styles.backdrop}>
        <SafeAreaView style={[styles.safeView]}>
          <View style={styles.secSlider}>
            <TouchableOpacity style={styles.secSliderArrowButton}>
              <View style={[styles.makeTriangle('left', '10', 'white')]} />
            </TouchableOpacity>
            <View style={[styles.secSliderStage, {height: this.props.stageHeight}]} onLayout={(event) => this.props.setStageHeight(event.nativeEvent.layout.width)}>
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
  return {
    stageSprite: state.mainReducer.stageSprite,
    stageHeight: state.mainReducer.stageHeight,
    pokemonList: state.mainReducer.pokemonList,
    nextUrl: state.mainReducer.nextUrl
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
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
