import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createSwitchNavigator } from "@react-navigation/compat";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Entrar" component={LoginScreen} />
    <Stack.Screen name="Cadastro" component={RegisterScreen} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: "#e91e63",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => <Ionicons name="ios-home" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageScreen}
      options={{
        tabBarLabel: "Messages",
        tabBarIcon: ({ color, size }) => <Ionicons name="ios-chatbubbles" color={color} size={size} />,
        tabBarBadge: 3,
      }}
    />
    <Tab.Screen
      name="Post"
      component={PostScreen}
      options={{
        tabBarLabel: "Post",
        tabBarIcon: ({ color, size }) => <Ionicons name="ios-add-circle-outline" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);

const SwitchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: TabNavigator,
    Auth: StackNavigator,
  },
  {
    initialRouteName: "Loading",
  }
);

export default function App() {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
}
