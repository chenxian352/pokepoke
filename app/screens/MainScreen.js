import React, { Component } from 'react'
import { View, SafeAreaView, TouchableOpacity, Text, ScrollView, Animated } from 'react-native'
import { createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native-expo-image-cache'
import styles from '../styles'
import * as ActionCreators from '../actions'
import * as CONFIGS from '../configs'
import { AntDesign } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-web'

class HomeScreen extends Component {

  state = {
    pokemonListAnimatedBottom: new Animated.Value(-200),
    pokemonListExpanded: false
  }

  componentDidMount() {
    this.props.getPokemonList()
  }

  renderListItem = (pokemon, i) => {
    return (
      <TouchableOpacity onPress={ event => this.props.setPokemonID(i) } key={ 'pokemonItem' + i }>
        <View style={ styles.secPokeListItem }>
          <Image style={ { height: 50, width: 50 } } uri={ pokemon.specs ? pokemon.specs.sprites.front_default : CONFIGS.imagePlaceHolder }/>
          <Text style={ { flex: 1, textTransform: 'capitalize' } }>{ pokemon.name }</Text>
          <View style={ { paddingRight: 20 } }>
            <View style={ [styles.makeTriangle('right', '10', '#ccc')] } />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderPokemonList = () => {
    const { pokemonList } = this.props
    if (pokemonList.length > 1) {
      return pokemonList.map((pokemon, i) => {
        return this.renderListItem(pokemon, i)
      })
    } else {
      return this.renderListItem({ name: 'Loading...' }, 1)
    }
  }

  getTypeTagColor = item => {
    switch (item.type.name) {
      case 'poison':
        return styles.backgroundColorPurple
      case 'grass':
      default:
        return styles.backgroundColorGreen
    }
  }
  renderTypes = stagePokemon => {
    if (!stagePokemon.specs.types) {
      return null
    }
    return stagePokemon.specs.types.map(item => {
      return <Text style={ [this.getTypeTagColor(item), styles.attributeTag] } key={ 'tag' + item.slot }>{ item.type.name }</Text>
    })
  }

  renderStat = (stat, i) => (
    <View style={ [styles.flexRow, { alignItems: 'center' }] } key={ 'stat' + i }>
      <Text style={ [styles.colorWhite, { marginRight: 10, textTransform: 'capitalize', width: 110 }] }>{ stat.stat.name }</Text>
      <View style={ { borderWidth: 1, borderColor: '#ccc', flex: 1, height: 12 } }>
        <View style={ { height: '100%', width: stat.base_stat / 190 * 100 + '%', backgroundColor: '#e6eff8' } }/>
      </View>
    </View>
  )

  togglePokemonList = () => {
    if (!this.state.pokemonListExpanded) {
      Animated.spring(this.state.pokemonListAnimatedBottom, { toValue: -100 }).start()
    } else {
      Animated.spring(this.state.pokemonListAnimatedBottom, { toValue: -200 }).start()
    }
    this.setState({ pokemonListExpanded: !this.state.pokemonListExpanded })
  }

  render() {
    const stagePokemon = this.props.pokemonList.length > 1 ? this.props.pokemonList[this.props.currentPokemonID] : { name: 'Loading...', specs: { sprites: { front_default: CONFIGS.imagePlaceHolder }}}
    return (
      <LinearGradient colors={ ['#32799D', '#85C2E2'] } style={ styles.backdrop }>
        <SafeAreaView style={ [styles.safeView] }>
          <View style={ styles.secSlider }>
            <TouchableOpacity style={ styles.secSliderArrowButton } onPress={ this.props.prevPokemon }>
              <View style={ [styles.makeTriangle('left', '20', 'white')] } />
            </TouchableOpacity>
            <View style={ [styles.secSliderStage, { height: this.props.stageHeight }] } onLayout={ event => this.props.setStageHeight(event.nativeEvent.layout.width) }>
              <Image style={ [styles.secSliderImage, { width: '120%', height: '120%' }] } uri={ stagePokemon.specs.sprites.front_default }/>
            </View>
            <TouchableOpacity style={ styles.secSliderArrowButton } onPress={ this.props.nextPokemon }>
              <View style={ [styles.makeTriangle('right', '20', 'white')] } />
            </TouchableOpacity>
          </View>
          <View style={ styles.secSpecs }>
            <View style={ [styles.flexRow, { alignItems: 'center' }] }>
              <Text style={ styles.secSpecsName }>{ stagePokemon.name }</Text>
              <TouchableOpacity onPress={ event => this.props.toggleFavorite(stagePokemon.name) }>
                <AntDesign color="white" style={ { marginLeft: 6, fontSize: 18 } } name={ stagePokemon.favorite ? 'star' : 'staro' }/>
              </TouchableOpacity>
            </View>
            <View style={ [styles.flexRow, { paddingTop: 2, paddingBottom: 10 }] }>
              { this.renderTypes(stagePokemon) }
            </View>
          </View>
          <ScrollView style={ [styles.secSpecs] }>
            <View style={ [styles.flexRow, styles.justifySpaceBetween] }>
              <View style={ styles.secSpecsAttributeSquare }>
                <Text>Base Exp.</Text>
                <Text style={ styles.fontSizeLarge }>{ stagePokemon.specs.base_experience }</Text>
              </View>
              <View style={ styles.secSpecsAttributeSquare }>
                <Text>Weight</Text>
                <Text style={ styles.fontSizeLarge }>{ stagePokemon.specs.weight }</Text>
              </View>
              <View style={ styles.secSpecsAttributeSquare }>
                <Text>Height</Text>
                <Text style={ styles.fontSizeLarge }>{ stagePokemon.specs.height }</Text>
              </View>
            </View>
            <View style={ [styles.flexRow, styles.secAbility] }>
              <Text style={ [styles.fontWeightBold, styles.colorWhite, { marginRight: 10 }] }>Ability</Text>
              { stagePokemon.specs.abilities ?
                stagePokemon.specs.abilities.map((item, index) => {
                  return <Text key={ 'ability' + index } style={ [styles.colorWhite, { marginRight: 5, textTransform: 'capitalize' }] }>{ item.ability.name }</Text>
                }) : null }
            </View>
            <View style={ styles.secStats }>
              <Text style={ [styles.fontWeightBold, styles.colorWhite, { marginRight: 10 }] }>Stats</Text>
              { stagePokemon.specs.stats ?
                stagePokemon.specs.stats.map((item, i) => this.renderStat(item, i))
                : null }
            </View>
          </ScrollView>
          <Animated.View style={ [styles.secPokeList, { bottom: this.state.pokemonListAnimatedBottom }] }>
            <TouchableWithoutFeedback onPress={ this.togglePokemonList } >
              <View style={ { paddingTop: 10, paddingBottom: 20 } } >
                <View style={ styles.secPokeListTrigger } />
              </View>
            </TouchableWithoutFeedback>
            <ScrollView>
              { this.renderPokemonList() }
            </ScrollView>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => {
  return {
    stageHeight: state.mainReducer.stageHeight,
    pokemonList: state.mainReducer.pokemonList,
    currentPokemonID: state.mainReducer.currentPokemonID
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
}

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const AppNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreenContainer
  }
}, {
  hideStatusBar: true,
  initialRouteName: 'HomeScreen',
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: '#6b52ae',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae'
  }
})

export default createAppContainer(AppNavigator)
