import { StyleSheet } from 'react-native';

const common = {
  FONT_SIZE_SMALL: 8,
  FONT_SIZE_REGULAR: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  COLOR_WHITE: '#ffffff',
  flex_1: {
    flex: 1
  },
  font_weight_bold: {
    fontWeight: 'bold'
  },
  flex_center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

const sectionSlider = {
  secSlider: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  secSliderStage: {
    display: "flex",
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 500,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secSliderImage: {
    width: 100,
    height: 100
  },
  secSliderArrowButton: {
    width: 30,
    ...common.flex_center
  }
};

const sectionPokeList = {
  secPokeList: {
    ...common.flex_1,
    backgroundColor: "red",
    padding: 30
  },
  secPokeListItem: {
    backgroundColor: "#FFF",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10
  }
};

const backdrop = {
  backdrop: {
    ...common.flex_1
  },
  safeView: {
    ...common.flex_1,
    display: "flex"
  }
};

const mixins = {
  makeTriangle(direction = 'up', size = 100, color = 'red') {
    let deg = '0deg';
    size = parseFloat(size);
    switch (direction) {
      case 'up':
        deg = '0deg';
        break;
      case 'down':
        deg = '180deg';
        break;
      case 'left':
        deg = '270deg';
        break;
      case 'right':
        deg = '90deg';
        break;
      default:
        break;
    }

    return {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: size/2,
      borderRightWidth: size/2,
      borderBottomWidth: size,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      transform: [{ rotate: deg }]
    }
  }
};

export default StyleSheet.create({
  ...mixins,
  ...sectionSlider,
  ...sectionPokeList,
  ...backdrop
});
