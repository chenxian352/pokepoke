import { StyleSheet } from 'react-native'

const common = {
  flex_1: {
    flex: 1
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between'
  },
  backgroundColorPurple: {
    backgroundColor: '#7057C4'
  },
  backgroundColorGreen: {
    backgroundColor: '#418628'
  },
  attributeTag: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    marginRight: 10,
    color: '#FFF',
    fontSize: 9,
    textTransform: 'capitalize',
    overflow: 'hidden'
  },
  fontSizeLarge: {
    fontSize: 24
  },
  fontWeightBold: {
    fontWeight: 'bold'
  },
  colorWhite: {
    color: '#FFF'
  }
}

const sectionSlider = {
  secSlider: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  secSliderStage: {
    display: 'flex',
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 500,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 15,
    overflow: 'hidden'
  },
  secSliderImage: {
    width: 100,
    height: 100
  },
  secSliderArrowButton: {
    width: 40,
    ...common.flexCenter
  }
}

const sectionPokeList = {
  secPokeList: {
    ...common.flex_1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    height: 100
  },
  secPokeListItem: {
    backgroundColor: '#FFF',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  }
}

const sectionSpecs = {
  secSpecs: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10
  },
  secSpecsName: {
    fontSize: 30,
    color: '#FFF',
    textTransform: 'capitalize'
  },
  secSpecsAttributeSquare: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 12,
    paddingBottom: 12
  }
}

const sectionAbility = {
  secAbility: {
    backgroundColor: '#C48C34',
    borderRadius: 12,
    display: 'flex',
    padding: 10,
    paddingLeft: 15,
    marginTop: 20
  }
}

const sectionStatus = {
  secStats: {
    backgroundColor: '#3f61c4',
    borderRadius: 12,
    display: 'flex',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    marginBottom: 40
  }
}

const backdrop = {
  backdrop: {
    ...common.flex_1
  },
  safeView: {
    ...common.flex_1,
    display: 'flex',
    paddingTop: 30
  }
}

const mixins = {
  makeTriangle(direction = 'up', size = 100, color = 'red') {
    let deg = '0deg'
    size = parseFloat(size)
    switch (direction) {
      case 'up':
        deg = '0deg'
        break
      case 'down':
        deg = '180deg'
        break
      case 'left':
        deg = '270deg'
        break
      case 'right':
        deg = '90deg'
        break
      default:
        break
    }

    return {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: size / 2,
      borderRightWidth: size / 2,
      borderBottomWidth: size,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      transform: [{ rotate: deg }]
    }
  }
}

export default StyleSheet.create({
  ...common,
  ...mixins,
  ...sectionSlider,
  ...sectionPokeList,
  ...sectionSpecs,
  ...sectionAbility,
  ...sectionStatus,
  ...backdrop
})
