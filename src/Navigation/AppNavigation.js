import React, { Component } from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import HomeScreen from "../Screens/Home/HomeScreen";
import SignInScreen from "../Screens/SignIn/SignInScreen";
import SideBar from "../Components/SideBar/SideBar";

const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: "none",
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />
  }
);
const AuthStack = createStackNavigator(
  { SignIn: SignInScreen },
  {
    headerMode: "none"
  }
);

export default createSwitchNavigator(
  {
    //SplashScreen: SplashScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    // Splash screen should be the initial route
    initialRouteName: "App"
  }
);
