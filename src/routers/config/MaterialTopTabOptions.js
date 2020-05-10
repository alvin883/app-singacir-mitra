import { Colors, FontFamily } from "_styles"
import { hexToRgb } from "_utils"

const MaterialTopTabOptions = {
  tabBarOptions: {
    activeTintColor: Colors.brandPrimary,
    inactiveTintColor: hexToRgb(Colors.textPrimary, 0.6),
    style: {
      height: 50,
      elevation: 0,
      borderBottomColor: Colors.themeBorder,
      borderBottomWidth: 1,
    },
    labelStyle: {
      fontFamily: FontFamily.normal,
      textTransform: "none",
    },
    indicatorStyle: {
      height: 1,
      backgroundColor: Colors.brandPrimary,
    },
  },
}

export default MaterialTopTabOptions
