import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Entrar" component={LoginScreen} />
    <Stack.Screen name="Cadastro" component={RegisterScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
