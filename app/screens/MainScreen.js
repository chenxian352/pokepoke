import React, { Component } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, ScrollView } from 'react-native';
import { createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from "react-native-expo-image-cache";
import styles from '../styles';
import * as ActionCreators from '../actions'
import * as CONFIGS from '../configs'

class HomeScreen extends Component {

  componentDidMount() {
    this.props.getPokemonList();
  }

  renderListItem = (pokemon, i) => {
    return (
        <View style={styles.secPokeListItem} key={'pokemonItem'+i}>
          <Image style={{height: 50, width: 50}} uri={pokemon.specs ? pokemon.specs.sprites.front_default : CONFIGS.imagePlaceHolder}/>
          <Text style={{flex: 1}}>{pokemon.name}</Text>
          <View style={{paddingRight: 20}}>
            <View style={[styles.makeTriangle('right', '10', '#ccc')]} />
          </View>
        </View>
    );
  };

  renderPokemonList = () => {
    if (this.props.pokemonList.length > 1) {
      return this.props.pokemonList.map((pokemon, i) => {
        return this.renderListItem(pokemon, i);
      })
    } else {
      return this.renderListItem({name: 'Loading...'}, 1);
    }
  };

  render() {
    return(
      <LinearGradient colors={['#32799D', '#85C2E2']} style={styles.backdrop}>
        <SafeAreaView style={[styles.safeView]}>
          <View style={styles.secSlider}>
            <TouchableOpacity style={styles.secSliderArrowButton}>
              <View style={[styles.makeTriangle('left', '10', 'white')]} />
            </TouchableOpacity>
            <View style={[styles.secSliderStage, {height: this.props.stageHeight}]} onLayout={(event) => this.props.setStageHeight(event.nativeEvent.layout.width)}>
              <Image style={styles.secSliderImage} uri={this.props.stageSprite}/>
            </View>
            <TouchableOpacity style={styles.secSliderArrowButton}>
              <View style={[styles.makeTriangle('right', '10', 'white')]} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.secPokeList}>
            { this.renderPokemonList() }
          </ScrollView>
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

const AppNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreenContainer
  }
}, {
  hideStatusBar: true,
  initialRouteName: "HomeScreen",
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: '#6b52ae',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae',
  },
});

export default createAppContainer(AppNavigator);
