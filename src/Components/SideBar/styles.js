import { StyleSheet, Dimensions } from "react-native";
import { appColors } from "../../Utils/Constants";
import { moderateScale, scale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  version_box: {
    alignContent: "flex-end",
    alignSelf: "center",
    justifyContent: "center",
    margin: 20
  },
  logout_button: { alignSelf: "center", margin: 20 },
  logo_image: {
    height: 150,
    width: 150,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    position: "absolute"
  },
  logo_container: {
    height: 100,
    width: "100%",
    alignContent: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  }
});
