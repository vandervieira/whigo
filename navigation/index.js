import React from "react";
import { createSwitchNavigator } from "@react-navigation/compat";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import LoadingScreen from "../screens/LoadingScreen";

const SwitchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: DrawerNavigator,
    Auth: AuthStackNavigator,
  },
  {
    initialRouteName: "Loading",
  }
);

export default function Routes() {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
}
